import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Journal} from '../../imports/api/collections/journal';
import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';
import {NetInCome} from '../../imports/api/collections/netIncome';
import {MapClosing} from '../../imports/api/collections/mapCLosing';
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';

import {Exchange} from '../../../core/imports/api/collections/exchange';


DateEndOfProcess.before.insert(function (userId, doc) {

    var date = moment(doc.closeDate,"DD/MM/YYYY").format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(DateEndOfProcess, prefix, 6);


    //Close Chart Account


    var currMonth = moment(doc.closeDate,"DD/MM/YYYY").format("MM");

    var selectorGetLastDate = {};
    var branchId = doc.branchId;
    selectorGetLastDate.branchId = branchId;
    var lastDate = CloseChartAccount.findOne(
        selectorGetLastDate, {
            sort: {
                closeDate: -1
            }
        });

    if (lastDate != undefined) {
        if (lastDate.closeDate < doc.closeDate) {

            var branchId = doc.branchId;
            var selectorGetLastBalance = {};
            var selectorGetLastDate = {};
            var selector = {};
            //Get Last Date Closing
            if (doc.closeDate != undefined) {
                selectorGetLastDate.closeDate = {
                    $lte: doc.closeDate
                };
            }

            selectorGetLastDate.branchId = branchId;
            var lastDate = CloseChartAccount.findOne(
                selectorGetLastDate, {
                    sort: {
                        closeDate: -1
                    }
                });

            //Parameter for Balance Last End Of Process
            if (lastDate != undefined) {
                selectorGetLastBalance.closeDate = lastDate.closeDate;
            }
            selectorGetLastBalance.branchId = branchId;

            //Parameter End Process
            if (currMonth=="12") {
                selector['transaction.accountDoc.accountTypeId'] = {
                    $gte: "01",
                    $lte: "39"
                };
            }
            selector.branchId = branchId;
            if (lastDate != undefined) {
                selector.journalDate = {
                    $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate(),
                    $lt: moment(moment(doc.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate()
                }
            } else {
                selector.journalDate = {
                    $lt: moment(moment(doc.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate()
                }
            }

            Meteor.call('getEndOfProcess', selector, branchId,
                selectorGetLastBalance, lastDate, doc.closeDate,doc._id );

        }
    } else {

        var branchId = doc.branchId;
        var selectorGetLastBalance = {};
        var selectorGetLastDate = {};
        var selector = {};
        //Get Last Date Closing
        if (doc.closeDate != undefined) {
            selectorGetLastDate.closeDate = {
                $lte: doc.closeDate
            };
        }
        selectorGetLastDate.branchId = branchId;
        var lastDate = CloseChartAccount.findOne(
            selectorGetLastDate, {
                sort: {
                    closeDate: -1
                }
            });

        //Parameter for Balance Last End Of Process
        if (lastDate != undefined) {
            selectorGetLastBalance.closeDate = lastDate.closeDate;
        }
        selectorGetLastBalance.branchId = branchId;

        //Parameter End Process
        if (currMonth=="12") {
            selector['transaction.accountDoc.accountTypeId'] = {
                $gte: "01",
                $lte: "39"
            };
        }

        selector.branchId = branchId;
        if (lastDate != undefined) {
            selector.journalDate = {
                $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate(),
                $lt: moment(moment(doc.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate()
            }
        } else {
            selector.journalDate = {
                $lt: moment(moment(doc.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1,'days').toDate()
            }
        }


        Meteor.call('getEndOfProcess', selector, branchId,
            selectorGetLastBalance, lastDate, doc.closeDate,doc._id );
    }














    //Insert NetIncome To Collection NetIncome
    //
    var year = moment(doc.closeDate,"DD/MM/YYYY").format("YYYY");

    var exchangeData = Exchange.findOne({}, {sort: {exDate: -1}});
    var selectorNetIncome = {};
    selectorNetIncome.branchId = doc.branchId;
    selectorNetIncome.currencyId = "All";
    // exChangeDate ==exChangeDateId
    selectorNetIncome.exchangeDate = exchangeData._id;
    selectorNetIncome.date = "01/"+moment(doc.closeDate,"DD/MM/YYYY").format("MM/YYYY") + " - " + moment(doc.closeDate,"DD/MM/YYYY").format("DD/MM/YYYY");

    var data = Meteor.call("acc_profitLostForAll", selectorNetIncome);
    var selector = {};
    selector.date = doc.closeDate;
    selector.riel = math.round(data.profitR,2);
    selector.baht = math.round(data.profitB,2);
    selector.dollar = math.round(data.profitUSD,2);
    selector.endId = doc._id;
    selector.year = year;
    selector.branchId=doc.branchId;

    NetInCome.insert(selector);

    // month is december must convert Net Income to Retain Earning
    if (moment(doc.closeDate).format("MM") == 12) {
        var netIncomeThisYear = NetInCome.find({year: year});
        var riel = 0;
        var dollar = 0;
        var baht = 0;
        netIncomeThisYear.forEach(function (obj) {
            riel += obj.riel;
            dollar += obj.dollar;
            baht += obj.baht;
        })

        var  rielDr= riel > 0 ? 0 : math.round(riel,2 )* (-1);
        var  rielCr= riel > 0 ? math.round(riel,2 ) : 0;

        var  dollarDr= dollar > 0 ? 0 : math.round(dollar,2) * (-1);
        var  dollarCr= dollar > 0 ? math.round(dollar,2)  : 0;

        var  bahtDr= baht > 0 ? 0 : math.round(baht,2) * (-1);
        var  bahtCr= baht > 0 ? math.round(baht,2) : 0;

        var accountDet = MapClosing.findOne({chartAccountCompare: "Retain Earning"});


        //Dollar
        var journalInsertNetIncomeDollar = {};
        journalInsertNetIncomeDollar.journalDate = moment("01-01-"+(parseInt(year) + 1),"DD/MM/YYYY").toDate();
        journalInsertNetIncomeDollar.currencyId = "USD";
        journalInsertNetIncomeDollar.voucherId = doc.branchId + (parseInt(year) + 1) + "000001";
        journalInsertNetIncomeDollar.memo = "Convert Net Income to Retain Earning in Dollar";
        journalInsertNetIncomeDollar.branchId = doc.branchId;
        journalInsertNetIncomeDollar.total = dollar;
        journalInsertNetIncomeDollar.endId = doc._id;

        var transactionDollar = [];
        transactionDollar.push({
            account: accountDet.accountDoc.code + " | " + accountDet.accountDoc.name + " | Equity",
            dr: dollarDr,
            cr: dollarCr,
            drcr:dollarDr-dollarCr
        });
        journalInsertNetIncomeDollar.transaction = transactionDollar;
        Journal.insert(journalInsertNetIncomeDollar);


        //Riel
        var journalInsertNetIncomeRiel = {};
        journalInsertNetIncomeRiel.journalDate = moment(  "01-01-"+(parseInt(year) + 1),"DD/MM/YYYY").toDate();
        journalInsertNetIncomeRiel.currencyId = "KHR";
        journalInsertNetIncomeRiel.voucherId = doc.branchId + (parseInt(year) + 1) + "000002";
        journalInsertNetIncomeRiel.memo = "Convert Net Income to Retain Earning in Riel";
        journalInsertNetIncomeRiel.branchId = doc.branchId;
        journalInsertNetIncomeRiel.total = riel;
        journalInsertNetIncomeRiel.endId = doc._id;

        var transactionRiel = [];
        transactionRiel.push({
            account: accountDet.accountDoc.code + " | " + accountDet.accountDoc.name + " | Equity",
            dr: rielDr,
            cr: rielCr,
            drcr: rielDr- rielCr
        });
        journalInsertNetIncomeRiel.transaction = transactionRiel;
        Journal.insert(journalInsertNetIncomeRiel);

        //Riel
        var journalInsertNetIncomeBaht = {};
        journalInsertNetIncomeBaht.journalDate = moment("01-01-"+(parseInt(year) + 1),"DD/MM/YYYY").toDate();
        journalInsertNetIncomeBaht.currencyId = "THB";
        journalInsertNetIncomeBaht.voucherId = doc.branchId + (parseInt(year) + 1) + "000003";
        journalInsertNetIncomeBaht.memo = "Convert Net Income to Retain Earning in Riel";
        journalInsertNetIncomeBaht.branchId = doc.branchId;
        journalInsertNetIncomeBaht.total = baht;
        journalInsertNetIncomeBaht.endId = doc._id;

        var transactionBaht = [];
        transactionBaht.push({
            account: accountDet.accountDoc.code + " | " + accountDet.accountDoc.name + " | Equity",
            dr: bahtDr,
            cr: bahtCr,
            drcr: bahtDr-bahtCr
        });
        journalInsertNetIncomeBaht.transaction = transactionBaht;
        Journal.insert(journalInsertNetIncomeBaht);

    }
    

});

CloseChartAccount.before.insert(function (userId, doc) {

    var date = moment(doc.closeDate,"DD/MM/YYYY").format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(CloseChartAccount, prefix, 6);

});

