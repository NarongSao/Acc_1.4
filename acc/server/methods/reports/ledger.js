import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Setting} from '../../../../core/imports/api/collections/setting';

import {ChartAccount} from '../../../imports/api/collections/chartAccount';
import {CloseChartAccount} from '../../../imports/api/collections/closeChartAccount';
import {Journal} from '../../../imports/api/collections/journal';

Meteor.methods({
    acc_ledgerReport: function (params) {
        if (!this.isSimulation) {
            var data = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };

            var date = s.words(params.date, ' - ');
            var fDate = moment(date[0], "DD/MM/YYYY").toDate();
            var tDate = moment(date[1], "DD/MM/YYYY").add(1, 'days').toDate();

            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;
            /****** Content *****/
            var self = params;
            var selector = {};
            var selectorAdvanced = {};
            var selectorGetLastDate = {};
            var selectorGetLastBalance = {};
            var selectorChartAccount = {};

            var exchangeDate = self.exchangeDate;

            if (!_.isEmpty(self.date)) {
                selector.journalDate = {
                    $gte: fDate,
                    $lt: tDate
                };
            }
            if (self.currencyId != "All") {
                selector.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selector.branchId = self.branchId;
            }
            if (self.chartAccount != "All") {
                selector['transaction.accountDoc._id'] = self.chartAccount;
            }

            if (!_.isArray(self.accountType)) {
                var accountTypeList = self.accountType.split(',');
            } else {
                var accountTypeList = self.accountType;
            }

            if (self.accountType != null) {
                selector['transaction.accountDoc.accountTypeId'] = {
                    $in: accountTypeList
                };
            }
            if (self.currencyId != "All") {
                var baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }


            if (self.chartAccount != "All") {
                selectorChartAccount._id = self.chartAccount;
            }



            if (self.accountType != null) {
                selectorChartAccount.accountTypeId = {
                    $in: accountTypeList
                };
            }


            var content = [];
            var endingBalance = 0;
            var endingAmount = 0;
            var endingDr = 0;
            var endingCr = 0;

            ChartAccount.find(selectorChartAccount, {
                    sort: {
                        code: 1
                    }
                })
                .forEach(function (obj) {


                    selectorAdvanced['transaction.accountDoc._id'] = obj._id;
                    var balanceOld = 0;

                    //Get Last Date Balance by Date Condition
                    if (self.date != null) {
                        selectorGetLastDate.closeDate = {
                            $lt: fDate
                        };
                    }
                    if (self.currencyId != "All") {
                        selectorGetLastDate.currencyId = self.currencyId;
                    }
                    if (self.branchId != "All") {
                        selectorGetLastDate.branchId = self.branchId;
                    }
                    /* if (self.chartAccount != "All") {
                     selectorGetLastDate.closeChartAccountId = self.chartAccount;
                     }*/
                    // selectorGetLastDate.closeChartAccountId = obj._id;
                    var lastDate = CloseChartAccount.findOne(
                        selectorGetLastDate, {
                            sort: {
                                closeDate: -1
                            }
                        });
                    //Get Balance From Close to Date Query
                    if (lastDate != null) {
                        selectorGetLastBalance.closeDate = lastDate.closeDate;
                    }
                    if (self.currencyId != "All") {
                        selectorGetLastBalance.currencyId = self.currencyId;
                    }
                    if (self.branchId != "All") {
                        selectorGetLastBalance.branchId = self.branchId;
                    }
                    selectorGetLastBalance.closeChartAccountId = obj._id;
                    var lastBalanceClose = 0;
                    if (lastDate != null) {
                        var resultLast = CloseChartAccount.find(
                            selectorGetLastBalance).fetch();
                        if (resultLast.length != 0) {
                            resultLast.forEach(function (lastBal) {
                                var re = Meteor.call('exchange', lastBal.currencyId,
                                    baseCurrency, lastBal.value, exchangeDate);
                                lastBalanceClose += re;
                            });
                        }
                    }

                    //Get Balance from Last Date Balance Until the Lowest Date Condition
                    if (lastDate != null) {
                        selectorAdvanced.journalDate = {
                            $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, 'days').toDate(),
                            $lt: fDate
                        };
                    } else {
                        selectorAdvanced.journalDate = {
                            $lt: fDate
                        };
                    }
                    if (self.currencyId != "All") {
                        selectorAdvanced.currencyId = self.currencyId;
                    }
                    if (self.branchId != "All") {
                        selectorAdvanced.branchId = self.branchId;
                    }

                    var resultLast1 = Journal.find(selectorAdvanced).fetch();
                    if (resultLast1.length != 0) {
                        resultLast1.forEach(function (oldData) {
                            if (oldData != undefined) {
                                oldData.transaction.forEach(function (oldDataTran) {
                                        if (oldDataTran.accountDoc._id == obj._id) {
                                            var convertDrcrOld = Meteor.call('exchange',
                                                oldData.currencyId, baseCurrency, oldDataTran
                                                    .drcr, exchangeDate);
                                            balanceOld += convertDrcrOld;
                                        }

                                    }
                                )
                            }
                        });
                    }
                    content.push({
                        isHeader: true,
                        isFooter: false,
                        name: obj.code + ":" + obj.name,
                        balance: lastBalanceClose + balanceOld
                    });

                    //Get The latest Balance
                    var balance = lastBalanceClose + balanceOld;
                    var totalDr = 0;
                    var totalCr = 0;
                    var totalDrCr = 0;

                    selector['transaction.accountDoc._id'] = obj._id;
                    var i = 0;
                    /*var resultData = ReactiveMethod.call("getJournalTran", selector);*/
                    var resultData = Journal.find(selector);

                    resultData.forEach(function (ob) {
                        var detailObj = {};
                        detailObj._id = ob._id;
                        detailObj.journalDate = ob.journalDate;
                        detailObj.memo = ob.memo;
                        detailObj.voucherId = ob.voucherId;

                        //Loop for Detail Transaction

                        ob.transaction.forEach(function (o) {
                            if (o.accountDoc._id == obj._id) {
                                i += 1;
                                detailObj.order = i;
                                var convertDrcr = Meteor.call('exchange', ob.currencyId,
                                    baseCurrency, o.drcr, exchangeDate);
                                var convertDr = Meteor.call('exchange', ob.currencyId,
                                    baseCurrency, o.dr, exchangeDate);
                                var convertCr = Meteor.call('exchange', ob.currencyId,
                                    baseCurrency, o.cr, exchangeDate);
                                detailObj.currencyid = baseCurrency;
                                detailObj.drcr = convertDrcr;
                                balance += convertDrcr;

                                detailObj.dr = convertDr;
                                detailObj.cr = convertCr;

                                totalDr += convertDr;
                                totalCr += convertCr;
                                totalDrCr += convertDrcr;

                                endingAmount += convertDrcr;
                                endingDr += convertDr;
                                endingCr += convertCr;


                            } else {
                                if (ob.splitAccount == "0") {
                                    detailObj.name = o.accountDoc.code + ":" + o.accountDoc
                                            .name;
                                } else {
                                    detailObj.name = "-split-";
                                }
                            }
                        });

                        detailObj.totalDr = totalDr;
                        detailObj.totalCr = totalCr;
                        detailObj.balance = balance;
                        detailObj.isHeader = false;
                        detailObj.isFooter = false;
                        content.push(detailObj);


                    });
                    endingBalance += balance;
                    content.push({
                        isHeader: false,
                        isFooter: true,
                        name: "Total " + obj.code + ":" + obj.name,
                        drcr: math.round(totalDrCr, 2),
                        balance: math.round(balance, 2),
                        dr: math.round(totalDr, 2),
                        cr: math.round(totalCr, 2),
                        endingCr: math.round(endingCr, 2),
                        currencyId: baseCurrency
                    });

                });

            data.endingBalance = math.round(endingBalance, 2);
            data.endingAmount = math.round(endingAmount, 2);
            data.endingDr = math.round(endingDr, 2);
            data.endingCr = math.round(endingCr, 2);
            data.currencyId = baseCurrency;

            if (content.length > 0) {
                data.content = content;
            }
            return data;
        }
    }
})
