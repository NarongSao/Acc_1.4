import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Setting} from '../../../../core/imports/api/collections/setting';
import {CloseChartAccount} from '../../../imports/api/collections/closeChartAccount';
import {Closing} from '../../../imports/api/collections/closing';
import {MapClosing} from '../../../imports/api/collections/mapCLosing';
import {ChartAccount} from '../../../imports/api/collections/chartAccount';
import {AccountType} from '../../../imports/api/collections/accountType';
import {Journal} from '../../../imports/api/collections/journal';

Meteor.methods({
    acc_currencyClosingReport: function (params, branchId) {
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
            var fDate = moment(date[0], 'DD/MM/YYYY').toDate();
            var tDate = moment(date[1], 'DD/MM/YYYY').add(1, 'days').toDate();

            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;

            /****** Content *****/
            var self = params;
            var selector = {};
            var exchangeDate = self.exchangeDate;

            var baseCurrency;
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
            if (self.currencyId != "All") {
                baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }
            selector['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };


            var year = moment(date[0], 'DD/MM/YYYY').format("YYYY");
            var currentBranch = branchId;

            //Condition for Base Currency Closing
            var baseCurrencyClosing = Setting.findOne().baseCurrency;


            var result = [];
            var grandTotalDr = 0;
            var grandTotalCr = 0;
            var grandTotal = 0;

            var i = 1;

            var resultBase = [];


            var content = Meteor.call("getCurrencyClosing", selector,
                baseCurrency, exchangeDate);
            var contentBase = Meteor.call("getCurrencyClosing", selector,
                baseCurrencyClosing, exchangeDate);
            content.reduce(function (key, val) {
                if (!key[val.account]) {
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        account: val.account,
                        currency: baseCurrency,
                        code: val.code,
                        order: i
                    };
                    i++;
                    result.push(key[val.account]);
                } else {
                    key[val.account].result += val.result;
                }
                return key;
            }, {});


            result.map(function (o) {
                if (o.result > 0) {
                    grandTotalDr += o.result;
                } else {
                    grandTotalCr += o.result;
                }
                grandTotal += math.round(o.result,2);
            });
            data.grandTotal = grandTotal;

            if (grandTotal > 0) {
                data.grandTotalDr = grandTotalDr;
                data.grandTotalCr = -1 * (math.round(grandTotalCr - grandTotal,2));
            } else {
                data.grandTotalDr = math.round(grandTotalDr - grandTotal,2);
                data.grandTotalCr = -1 * grandTotalCr;
            }

            data.grandTotal = grandTotal;
            data.currencySelect = baseCurrency;
            data.result = result;


            // Base Currency Closing
            var grandTotalDrBase = 0,
                grandTotalCrBase = 0,
                grandTotalBase = 0;

            var i = 1;
            contentBase.reduce(function (key, val) {
                if (!key[val.account]) {
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        account: val.account,
                        currency: baseCurrencyClosing,
                        code: val.code,
                        order: i
                    };
                    i++;
                    resultBase.push(key[val.account]);
                } else {
                    key[val.account].result += val.result;
                }
                return key;
            }, {});

            data.lastOrder = i;
            resultBase.map(function (o) {
                if (o.result > 0) {
                    grandTotalDrBase += o.result;
                } else {
                    grandTotalCrBase += o.result;
                }
                grandTotalBase += math.round(o.result,2);
            });
            data.grandTotalBase = grandTotalBase;

            if (grandTotal > 0) {
                data.grandTotalDrBase = grandTotalDrBase;
                data.grandTotalCrBase = -1 * (math.round(grandTotalCrBase - grandTotalBase,2));

            } else {
                data.grandTotalDrBase = math.round(grandTotalDrBase - grandTotalBase,2);
                data.grandTotalCrBase = -1 * grandTotalCrBase;
            }

            data.grandTotalBase = grandTotalBase;
            data.currencySelectBase = baseCurrencyClosing;
            data.resultBase = resultBase;
            data.generateAndEntry = GenerateAndEntry.get();
            data.print = Print.get();

            if (GenerateAndEntry.get() == true) {


                var selectorClose = {};
                selectorClose.dateFrom = fDate;
                selectorClose.dateTo = moment(date[1], "DD/MM/YYYY").toDate();
                selectorClose.branchId = self.branchId;

                var closingId = Closing.insert(selectorClose);

                var arr = [];

                var equ = MapClosing.findOne({
                    chartAccountCompare: "Equivalance Exchange Account"
                });
                var gainFor = MapClosing.findOne({
                    chartAccountCompare: "Foreign Exchange Gain"
                });
                var lostFor = MapClosing.findOne({
                    chartAccountCompare: "Loss on Foreign Exchange"
                });
                //Get ChartAccount by Id
                var accountDocDetail = ChartAccount.findOne({
                    _id: equ.accountDoc._id
                });


                var foreinExchangeGainDoc = ChartAccount.findOne({
                    _id: gainFor.accountDoc._id
                })

                var foreinExchangeLossDoc = ChartAccount.findOne({
                    _id: lostFor.accountDoc._id
                })


                if (data.grandTotalDr > 0) {
                    data.result.forEach(function (obj) {
                        if (obj.result > 0) {
                            var dr = 0;
                            var cr = math.round(Math.abs(obj.result), 2);
                        } else {
                            var dr = math.round(Math.abs(obj.result), 2);
                            var cr = 0;
                        }
                        var accountDetail = ChartAccount.findOne({
                            _id: obj.account
                        });
                        var accountType = AccountType.findOne({
                            _id: accountDetail.accountTypeId
                        });

                        arr.push({
                            account: obj.code + " | " + obj.name + " | " +
                            accountType.name,
                            dr: dr,
                            cr: cr,
                            drcr: dr - cr,
                            accountDoc: accountDetail
                        });
                    });
                    var dr, cr;
                    if (data.grandTotal > 0) {
                        dr = math.round(Math.abs(data.grandTotal), 2);
                        cr = 0;
                        equival = math.round(Math.abs(data.grandTotal), 2);
                    } else {
                        dr = 0;
                        cr = math.round(Math.abs(data.grandTotal), 2);
                        equival = math.round(Math.abs(data.grandTotal), 2);
                    }

                    arr.push({
                        account: accountDocDetail.code + " | " +
                        accountDocDetail.name + " | " + "Other Asset",
                        dr: dr,
                        cr: cr,
                        drcr: dr - cr,
                        accountDoc: accountDocDetail
                    });

                    var doc = {};


                    var voucher = Meteor.call('getVoucherId', data.currencySelect);

                    if (voucher != null) {
                        var lastVoucherId = currentBranch + "-" + year + s.pad(parseInt(
                                    (voucher.voucherId).substr(8, 13)) + 1, 6, "0");
                    } else {
                        lastVoucherId = currentBranch + "-" + year + "000001";
                    }


                    doc.transaction = arr;
                    doc.journalDate = moment(date[1], "DD/MM/YYYY").toDate();
                    doc.currencyId = data.currencySelect;
                    doc.voucherId = lastVoucherId == undefined ? currentBranch + "-" + year + "000001" : lastVoucherId;
                    doc.memo = 'Closing ' + data.currencySelect;
                    doc.branchId = branchId;
                    doc.total = data.grandTotalDr;

                    doc.closingId = closingId;
                    var insertSuccess = Journal.insert(doc);
                    if (insertSuccess) {
                        data.insertSuccess = true;
                    }
                }

                /*
                 * Base
                 * */

                var arrBase = [];
                if (data.grandTotalDrBase > 0) {
                    data.resultBase.forEach(function (obj) {
                        if (obj.result > 0) {
                            var dr = math.round(Math.abs(obj.result), 2);
                            var cr = 0;
                        } else {
                            var dr = 0;
                            var cr = math.round(Math.abs(obj.result), 2);
                        }
                        var accountDetail = ChartAccount.findOne({
                            _id: obj.account
                        });
                        var accountType = AccountType.findOne({
                            _id: accountDetail.accountTypeId
                        });

                        arrBase.push({
                            account: obj.code + " | " + obj.name + " | " +
                            accountType.name,
                            dr: dr,
                            cr: cr,
                            drcr: dr - cr,
                            accountDoc: accountDetail
                        });
                    });

                    if (data.grandTotalBase > 0) {
                        dr = 0;
                        cr = math.round(Math.abs(data.grandTotalBase), 2);
                        equivalBase = math.round(Math.abs(data.grandTotalBase), 2);
                    } else {
                        dr = math.round(Math.abs(data.grandTotalBase), 2);
                        cr = 0;
                        equivalBase = math.round(Math.abs(data.grandTotalBase), 2);
                    }


                    arrBase.push({
                        account: accountDocDetail.code + " | " +
                        accountDocDetail.name + " | " + "Other Asset",
                        dr: dr,
                        cr: cr,
                        drcr: dr - cr,
                        accountDoc: accountDocDetail
                    });

                    var voucher = Meteor.call('getVoucherId', data.currencySelectBase);
                    if (voucher != null) {
                        var lastVoucherId = currentBranch + "-" + year + s.pad(parseInt(
                                    (voucher.voucherId).substr(8, 13)) + 1, 6, "0");
                    } else {
                        lastVoucherId = currentBranch + "-" + year + "000001";
                    }


                    var docBase = {};
                    docBase.transaction = arrBase;
                    docBase.journalDate = moment(date[1], "DD/MM/YYYY").toDate();
                    docBase.currencyId = data.currencySelectBase;
                    docBase.voucherId = lastVoucherId == undefined ? currentBranch + "-" + year + "000001" : lastVoucherId;
                    docBase.memo = 'Closing ' + data.currencySelectBase;
                    docBase.branchId = branchId;
                    docBase.total = data.grandTotalDrBase;
                    docBase.closingId = closingId;

                    var insertBaseSuccess = Journal.insert(docBase);
                    if (insertBaseSuccess) {
                        data.insertBaseSuccess = true;
                    }
                }
                //  Entry Exchange Gain Loss
                //

                // Get Equivalence Exchange Account Old

                // Selected Currency
                var selectorEquivalBaseOld = {};
                selectorEquivalBaseOld.currencyId = self.currencyId;
                selectorEquivalBaseOld['transaction.accountDoc.code'] =
                    accountDocDetail.code;

                var equivalBaseOld = Meteor.call("getBalanceSheet",
                    selectorEquivalBaseOld, baseCurrencyClosing, exchangeDate, null,
                    null);

                var amountEquivBase = 0;
                equivalBaseOld.forEach(function (obj) {
                    if (obj.code == accountDocDetail.code) {
                        amountEquivBase += obj.result;
                    }
                });
                // Base Currency
                var selectorEquivalOld = {};
                selectorEquivalOld.currencyId = baseCurrencyClosing;
                selectorEquivalOld['transaction.accountDoc.code'] =
                    accountDocDetail.code;
                var equivalOld = Meteor.call("getBalanceSheet",
                    selectorEquivalOld, baseCurrencyClosing, exchangeDate, null,
                    null);
                var amountEquiv = 0;
                equivalOld.forEach(function (obj) {
                    if (obj.code == accountDocDetail.code) {
                        amountEquiv += obj.result;
                    }
                });

                var foreignExObj = {};
                var foreignExDetail = [];

                var foreinExchange = math.round(-1 * amountEquiv - 1 *
                    amountEquivBase, 2);

                if (foreinExchange > 0) {
                    foreignExDetail.push({
                        account: accountDocDetail.code + " | " +
                        accountDocDetail.name + " | " + "Other Asset",
                        dr: foreinExchange,
                        cr: 0,
                        drcr: foreinExchange,
                        accountDoc: accountDocDetail
                    });

                    foreignExDetail.push({
                        account: foreinExchangeGainDoc.code + " | " +
                        foreinExchangeGainDoc.name + " | " + "Income",
                        dr: 0,
                        cr: foreinExchange,
                        drcr: -1 * foreinExchange,
                        accountDoc: foreinExchangeGainDoc
                    });

                    foreignExObj.transaction = foreignExDetail;
                    foreignExObj.journalDate = moment(date[1], "DD/MM/YYYY").toDate();
                    foreignExObj.currencyId = data.currencySelectBase;
                    foreignExObj.voucherId = lastVoucherId == undefined ? currentBranch + "-" + year + "000001" : lastVoucherId;
                    foreignExObj.memo = 'Exchange Gain ';
                    foreignExObj.branchId = branchId;
                    foreignExObj.total = math.abs(foreinExchange);

                    foreignExObj.closingId = closingId;

                    var insertExchangeSuccess = Journal.insert(
                        foreignExObj);
                    if (insertExchangeSuccess) {
                        data.insertExchangeSuccess = true;
                    }
                } else if (foreinExchange < 0) {
                    foreignExDetail.push({
                        account: foreinExchangeLossDoc.code + " | " +
                        foreinExchangeLossDoc.name + " | " + "Expense",
                        dr: -1 * foreinExchange,
                        cr: 0,
                        drcr: -1 * foreinExchange,
                        accountDoc: foreinExchangeLossDoc
                    });
                    foreignExDetail.push({
                        account: accountDocDetail.code + " | " +
                        accountDocDetail.name + " | " + "Other Asset",
                        dr: 0,
                        cr: -1 * foreinExchange,
                        drcr: foreinExchange,
                        accountDoc: accountDocDetail
                    });

                    foreignExObj.transaction = foreignExDetail;
                    foreignExObj.journalDate = moment(date[1], "DD/MM/YYYY").toDate();
                    foreignExObj.currencyId = data.currencySelectBase;
                    foreignExObj.voucherId = lastVoucherId == undefined ? currentBranch + "-" + year + "000001" : lastVoucherId;
                    foreignExObj.memo = 'Exchange Loss ';
                    foreignExObj.branchId = branchId;
                    foreignExObj.total = math.abs(foreinExchange);
                    foreignExObj.closingId = closingId;

                    var insertExchangeSuccess = Journal.insert(
                        foreignExObj);
                    if (insertExchangeSuccess) {
                        data.insertExchangeSuccess = true;
                    }
                }
            }
        }
        GenerateAndEntry.set(false);
        return data;
    },
    generateAndEntry: function (val) {
        GenerateAndEntry.set(val);
    },
    print: function (val) {
        Print.set(val);
    },
    closingRemove: function (id) {
        Journal.remove({closingId: id});
        Closing.remove(id);
    }
});
