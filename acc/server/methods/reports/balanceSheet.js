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

import {SpaceChar} from '../../../common/configs/space';


Meteor.methods({
    acc_BalanceSheetMulti: function(params) {

        if (!this.isSimulation) {
            var dataMain = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };


            var self = params;
            var startYear = moment(self.date, "DD/MM/YYYY").format("YYYY");
            var startDate = moment('01-01-' + startYear, "DD/MM/YYYY").toDate();
            /****** Title *****/
            dataMain.title = Company.findOne();

            /****** Header *****/
            dataMain.header = params;


            /****** Content *****/

            var selector = {};
            var exchangeDate = self.exchangeDate;

            var selectorGetLastDate = {};
            var selectorGetLastBalance = {};

            //Get Last Date Closing
            if (self.date != null) {
                selectorGetLastDate.closeDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").toDate()
                };
            }
            if (self.currencyId != "All") {
                selectorGetLastDate.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorGetLastDate.branchId = self.branchId;
            }
            var lastDate = CloseChartAccount.findOne(
                selectorGetLastDate, {
                    sort: {
                        closeDate: -1
                    }
                });

            //Parameter for Balance Last End Of Process
            if (lastDate != null) {
                selectorGetLastBalance.closeDate = lastDate.closeDate;
            }
            if (self.currencyId != "All") {
                selectorGetLastBalance.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorGetLastBalance.branchId = self.branchId;
            }

            //Parameter for balance sheet
            if (lastDate != null) {
                selector.journalDate = {
                    $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, 'days').toDate(),
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate()
                };
            } else {
                selector.journalDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate()
                };
            }
            if (self.currencyId != "All") {
                selector.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selector.branchId = self.branchId;
            }

            if (self.currencyId != "All") {
                var baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }

            var content = [];
            var otherCurrentAsset = [];
            var totalOtherCurrentAsset = 0;
            var totalOtherCurrentAssetUSD = 0;
            var totalOtherCurrentAssetRiel = 0;
            var totalOtherCurrentAssetBath = 0;

            var fixAsset = [];
            var totalFixAsset = 0;
            var totalFixAssetUSD = 0;
            var totalFixAssetRiel = 0;
            var totalFixAssetBath = 0;

            var otherFixAsset = [];
            var totalOtherFixAsset = 0;
            var totalOtherFixAssetUSD = 0;
            var totalOtherFixAssetRiel = 0;
            var totalOtherFixAssetBath = 0;


            var otherCurrentLiability = [];
            var totalOtherCurrentLiability = 0;
            var totalOtherCurrentLiabilityUSD = 0;
            var totalOtherCurrentLiabilityRiel = 0;
            var totalOtherCurrentLiabilityBath = 0;

            var longTermLiability = [];
            var totalLongTermLiability = 0;
            var totalLongTermLiabilityUSD = 0;
            var totalLongTermLiabilityRiel = 0;
            var totalLongTermLiabilityBath = 0;


            var equity = [];
            var totalEquityUSD = 0;
            var totalEquityRiel = 0;
            var totalEquityBath = 0;
            var totalEquity = 0;

            var result = [];

            var x = 1;

            //Condition to get Net Income
            var selectorProfit = {};
            if (!_.isEmpty(self.date)) {
                selectorProfit.journalDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate(),
                    $gte: startDate
                };
            }
            if (self.currencyId != "All") {
                selectorProfit.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorProfit.branchId = self.branchId;
            }

            selectorProfit['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };

            var contentProfit = {};
            var resultIncome = [];
            var resultExpense = [];

            var grandTotalIncome = 0;
            var grandTotalIncomeUSD = 0;
            var grandTotalIncomeRiel = 0;
            var grandTotalIncomeBath = 0;

            var grandTotalExpense = 0;
            var grandTotalExpenseUSD = 0;
            var grandTotalExpenseRiel = 0;
            var grandTotalExpenseBath = 0;

            var profitAndLost = Meteor.call("getProfitLost", selectorProfit,
                baseCurrency, exchangeDate);
            profitAndLost.reduce(function (key, val) {
                if (!key[val.account]) {
                    var amountUsd = 0,
                        amountRiel = 0,
                        amountThb = 0;
                    if (val.currency == "USD") {
                        amountUsd = val.value;
                    } else if (val.currency == "KHR") {
                        amountRiel = val.value;
                    } else if (val.currency == "THB") {
                        amountThb = val.value;
                    }
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        currency: baseCurrency,
                        code: val.code,
                        amountUsd: amountUsd,
                        amountRiel: amountRiel,
                        amountThb: amountThb
                    };
                    if (val.accountType >= 40 && val.accountType <= 49) {
                        resultIncome.push(key[val.account]);
                    } else if (val.accountType >= 50 && val.accountType <= 59) {
                        resultExpense.push(key[val.account]);
                    }

                } else {
                    key[val.account].result += val.result;
                    if (val.currency == "USD") {
                        key[val.account].amountUsd += val.value;
                    } else if (val.currency == "KHR") {
                        key[val.account].amountRiel += val.value;
                    } else if (val.currency == "THB") {
                        key[val.account].amountThb += val.value;
                    }
                }
                if (val.accountType >= 40 && val.accountType <= 49) {
                    grandTotalIncome += val.result;
                    if (val.currency == "USD") {
                        grandTotalIncomeUSD += val.value;
                    } else if (val.currency == "KHR") {
                        grandTotalIncomeRiel += val.value;
                    } else if (val.currency == "THB") {
                        grandTotalIncomeBath += val.value;
                    }

                } else if (val.accountType >= 50 && val.accountType <= 59) {
                    grandTotalExpense += val.result;
                    if (val.currency == "USD") {
                        grandTotalExpenseUSD += val.value;
                    } else if (val.currency == "KHR") {
                        grandTotalExpenseRiel += val.value;
                    } else if (val.currency == "THB") {
                        grandTotalExpenseBath += val.value;
                    }
                }
                return key;
            }, {});

            contentProfit.resultIncome = resultIncome;
            contentProfit.grandTotalIncome = grandTotalIncome;
            contentProfit.grandTotalIncomeUSD = grandTotalIncomeUSD;
            contentProfit.grandTotalIncomeRiel = grandTotalIncomeRiel;
            contentProfit.grandTotalIncomeBath = grandTotalIncomeBath;

            contentProfit.resultExpense = resultExpense;
            contentProfit.grandTotalExpense = grandTotalExpense;
            contentProfit.grandTotalExpenseUSD = grandTotalExpenseUSD;
            contentProfit.grandTotalExpenseRiel = grandTotalExpenseRiel;
            contentProfit.grandTotalExpenseBath = grandTotalExpenseBath;

            contentProfit.profit = grandTotalIncome - grandTotalExpense;
            contentProfit.profitUSD = grandTotalIncomeUSD - grandTotalExpenseUSD;
            contentProfit.profitRiel = grandTotalIncomeRiel -
                grandTotalExpenseRiel;
            contentProfit.profitBath = grandTotalIncomeBath -
                grandTotalExpenseBath;

            contentProfit.currencySelect = baseCurrency;

            //New Balance
            var balanceSheet = Meteor.call("getBalanceSheet", selector,
                baseCurrency, exchangeDate, selectorGetLastBalance, lastDate,self.showNonActive);
            balanceSheet.reduce(function (key, val) {
                if (!key[val.account]) {
                    var amountUsd = 0,
                        amountRiel = 0,
                        amountThb = 0;
                    if (val.currency == "USD") {
                        amountUsd = val.value;
                    } else if (val.currency == "KHR") {
                        amountRiel = val.value;
                    } else if (val.currency == "THB") {
                        amountThb = val.value;
                    }
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        account: val.account,
                        currency: baseCurrency,
                        code: val.code,
                        accountTypeId: val.accountTypeId,
                        level: val.level,
                        parent: val.parent == null ? "" : val.parent,
                        amountUsd: amountUsd,
                        amountRiel: amountRiel,
                        amountThb: amountThb


                    };
                    result.push(key[val.account]);
                } else {
                    key[val.account].result += val.result;
                    if (val.currency == "USD") {
                        key[val.account].amountUsd += val.value;
                    } else if (val.currency == "KHR") {
                        key[val.account].amountRiel += val.value;
                    } else if (val.currency == "THB") {
                        key[val.account].amountThb += val.value;
                    }
                }
                return key;
            }, {});


            var temporary = "";
            var isPush = true;
            var subTotal = 0;
            var subTotalUSD = 0;
            var subTotalRiel = 0;
            var subTotalTHB = 0;
            var data, dataOld;

            var variable = "";
            var h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;

            result.forEach(function (o) {

                if (o.accountTypeId == "10") {
                    totalOtherCurrentAsset += o.result;
                    totalOtherCurrentAssetUSD += o.amountUsd;
                    totalOtherCurrentAssetRiel += o.amountRiel;
                    totalOtherCurrentAssetBath += o.amountThb;

                    // Push Total of Header when have Sub Account

                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent & isPush == false) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }

                    // Push Header when have Sub Account

                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherCurrentAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;

                            isPush = false;
                            variable = otherCurrentAsset;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }

                    temporary = o.parent;


                    otherCurrentAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb
                    });


                } else if (o.accountTypeId == "11") {
                    totalFixAsset += o.result;
                    totalFixAssetUSD += o.amountUsd;
                    totalFixAssetRiel += o.amountRiel;
                    totalFixAssetBath += o.amountThb;

                    if (isPush === false && i == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: subTotal
                                });
                                isPush = true;

                            }
                        }
                    }
                    i = 1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            fixAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;
                            isPush = false;
                            variable = fixAsset;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }

                    fixAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb

                    });


                } else if (o.accountTypeId == "12") {
                    totalOtherFixAsset += o.result;
                    totalOtherFixAssetUSD += o.amountUsd;
                    totalOtherFixAssetRiel += o.amountRiel;
                    totalOtherFixAssetBath += o.amountThb;


                    if (isPush === false && j == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: subTotal

                                });
                                isPush = true;

                            }
                        }
                    }
                    j = 1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherFixAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;
                            isPush = false;
                            variable = otherFixAsset;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }


                    otherFixAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb
                    });

                } else if (o.accountTypeId == "20") {
                    totalOtherCurrentLiability += o.result;
                    totalOtherCurrentLiabilityUSD += o.amountUsd;
                    totalOtherCurrentLiabilityRiel += o.amountRiel;
                    totalOtherCurrentLiabilityBath += o.amountThb;

                    if (isPush === false && k == 0) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal
                            });
                            isPush = true;
                        }
                    }
                    k = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherCurrentLiability.push({
                                name: data.name,
                                code: SpaceChar.space(22 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;
                            isPush = false;
                            variable = otherCurrentLiability;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }


                    otherCurrentLiability.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(22 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                } else if (o.accountTypeId == "21") {
                    totalLongTermLiability += o.result;
                    totalLongTermLiabilityUSD += o.amountUsd;
                    totalLongTermLiabilityRiel += o.amountRiel;
                    totalLongTermLiabilityBath += o.amountThb;

                    if (isPush === false && l == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: x * subTotal
                                });
                                isPush = true;

                            }
                        }
                    }
                    l = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            longTermLiability.push({
                                name: data.name,
                                code: SpaceChar.space(22 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;
                            isPush = false;
                            variable = longTermLiability;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }
                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }

                    longTermLiability.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(22 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                } else if (o.accountTypeId == "30") {
                    totalEquity += o.result;
                    totalEquityUSD += o.amountUsd;
                    totalEquityRiel += o.amountRiel;
                    totalEquityBath += o.amountThb;

                    if (isPush === false && m == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: x * subTotal
                                });
                                isPush = true;
                            }
                        }
                    }
                    m = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            equity.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            subTotalUSD = o.amountUsd;
                            subTotalRiel = o.amountRiel;
                            subTotalTHB = o.amountThb;
                            isPush = false;
                            variable = equity;
                        } else {
                            subTotal += o.result;
                            subTotalUSD += o.amountUsd;
                            subTotalRiel += o.amountRiel;
                            subTotalTHB += o.amountThb;
                        }
                    }

                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal,
                                amountUsd: subTotalUSD,
                                amountRiel: subTotalRiel,
                                amountThb: subTotalTHB
                            });
                            isPush = true;
                        }
                    }

                    equity.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                }
            });

            var len = 0;
            if (variable !== otherCurrentLiability && variable !==
                longTermLiability) {
                len = 15;
            } else {
                len = 22;
            }
            if (isPush === false) {
                if (dataOld != null) {
                    variable.push({
                        name: dataOld.name,
                        code: SpaceChar.space(len + (6 * dataOld.level)) +
                        'Total : ' + dataOld.code,
                        amount: x * subTotal,
                        amountUsd: subTotalUSD,
                        amountRiel: subTotalRiel,
                        amountThb: subTotalTHB
                    });
                    isPush = true;
                }
            }

            dataMain.profit = contentProfit.profit;
            dataMain.profitRiel = contentProfit.profitRiel;
            dataMain.profitUSD = contentProfit.profitUSD;
            dataMain.profitBath = contentProfit.profitBath;

            dataMain.otherCurrentAsset = otherCurrentAsset;
            dataMain.fixAsset = fixAsset;
            dataMain.otherFixAsset = otherFixAsset;
            dataMain.otherCurrentLiability = otherCurrentLiability;
            dataMain.longTermLiability = longTermLiability;
            dataMain.equity = equity;

            dataMain.totalOtherCurrentAsset = math.round(totalOtherCurrentAsset,
                2);
            dataMain.totalOtherCurrentAssetUSD = math.round(
                totalOtherCurrentAssetUSD,
                2);
            dataMain.totalOtherCurrentAssetRiel = math.round(
                totalOtherCurrentAssetRiel,
                2);
            dataMain.totalOtherCurrentAssetBath = math.round(
                totalOtherCurrentAssetBath,
                2);

            dataMain.totalFixAsset = math.round(totalFixAsset, 2);
            dataMain.totalFixAssetUSD = math.round(totalFixAssetUSD, 2);
            dataMain.totalFixAssetRiel = math.round(totalFixAssetRiel, 2);
            dataMain.totalFixAssetBath = math.round(totalFixAssetBath, 2);

            dataMain.totalOtherFixAsset = math.round(totalOtherFixAsset, 2);
            dataMain.totalOtherFixAssetUSD = math.round(totalOtherFixAssetUSD, 2);
            dataMain.totalOtherFixAssetRiel = math.round(totalOtherFixAssetRiel,
                2);
            dataMain.totalOtherFixAssetBath = math.round(totalOtherFixAssetBath,
                2);

            dataMain.totalOtherCurrentLiability = (-1) * math.round(
                    totalOtherCurrentLiability, 2);
            dataMain.totalOtherCurrentLiabilityUSD = (-1) * math.round(
                    totalOtherCurrentLiabilityUSD, 2);
            dataMain.totalOtherCurrentLiabilityRiel = (-1) * math.round(
                    totalOtherCurrentLiabilityRiel, 2);
            dataMain.totalOtherCurrentLiabilityBath = (-1) * math.round(
                    totalOtherCurrentLiabilityBath, 2);

            dataMain.totalLongTermLiability = (-1) * math.round(
                    totalLongTermLiability, 2);
            dataMain.totalLongTermLiabilityUSD = (-1) * math.round(
                    totalLongTermLiabilityUSD, 2);
            dataMain.totalLongTermLiabilityRiel = (-1) * math.round(
                    totalLongTermLiabilityRiel, 2);
            dataMain.totalLongTermLiabilityBath = (-1) * math.round(
                    totalLongTermLiabilityBath, 2);

            dataMain.totalEquity = ((-1) * math.round(totalEquity, 2)) + math.round(
                    contentProfit.profit, 2);
            dataMain.totalEquityUSD = ((-1) * math.round(totalEquityUSD, 2)) +
                math.round(
                    contentProfit.profitUSD, 2);
            dataMain.totalEquityRiel = ((-1) * math.round(totalEquityRiel, 2)) +
                math.round(
                    contentProfit.profitRiel, 2);
            dataMain.totalEquityBath = ((-1) * math.round(totalEquityBath, 2)) +
                math.round(
                    contentProfit.profitBath, 2);


            dataMain.totalAsset = parseFloat(dataMain.totalOtherCurrentAsset) +
                parseFloat(dataMain.totalFixAsset) + parseFloat(dataMain.totalOtherFixAsset);
            dataMain.totalAssetUSD = parseFloat(dataMain.totalOtherCurrentAssetUSD) +
                parseFloat(dataMain.totalFixAssetUSD) + parseFloat(dataMain.totalOtherFixAssetUSD);
            dataMain.totalAssetRiel = parseFloat(dataMain.totalOtherCurrentAssetRiel) +
                parseFloat(dataMain.totalFixAssetRiel) + parseFloat(dataMain.totalOtherFixAssetRiel);
            dataMain.totalAssetBath = parseFloat(dataMain.totalOtherCurrentAssetBath) +
                parseFloat(dataMain.totalFixAssetBath) + parseFloat(dataMain.totalOtherFixAssetBath);

            dataMain.totalLiability = dataMain.totalOtherCurrentLiability +
                dataMain.totalLongTermLiability;
            dataMain.totalLiabilityUSD = dataMain.totalOtherCurrentLiabilityUSD +
                dataMain.totalLongTermLiabilityUSD;
            dataMain.totalLiabilityRiel = dataMain.totalOtherCurrentLiabilityRiel +
                dataMain.totalLongTermLiabilityRiel;
            dataMain.totalLiabilityBath = dataMain.totalOtherCurrentLiabilityBath +
                dataMain.totalLongTermLiabilityBath;

            dataMain.totalLiabilityAndEquity = dataMain.totalOtherCurrentLiability +
                dataMain.totalLongTermLiability + dataMain.totalEquity;
            dataMain.totalLiabilityAndEquityUSD = dataMain.totalOtherCurrentLiabilityUSD +
                dataMain.totalLongTermLiabilityUSD + dataMain.totalEquityUSD;
            dataMain.totalLiabilityAndEquityRiel = dataMain.totalOtherCurrentLiabilityRiel +
                dataMain.totalLongTermLiabilityRiel + dataMain.totalEquityRiel;
            dataMain.totalLiabilityAndEquityBath = dataMain.totalOtherCurrentLiabilityBath +
                dataMain.totalLongTermLiabilityBath + dataMain.totalEquityBath;

            if (math.abs(dataMain.totalAsset - dataMain.totalLiabilityAndEquity) <=
                0.05 &&
                baseCurrency == "USD") {
                dataMain.totalAsset = dataMain.totalLiabilityAndEquity;
            } else if (math.abs(dataMain.totalAsset - dataMain.totalLiabilityAndEquity) <=
                500 &&
                baseCurrency == "KHR") {
                dataMain.totalAsset = dataMain.totalLiabilityAndEquity;
            }

            dataMain.currencySelect = baseCurrency;
            if (content.length > 0) {
                dataMain.content = content
            }
            return dataMain;
        }

    },


    acc_BalanceSheet: function(params) {
        if (!this.isSimulation) {
            var dataMain = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };
            var self = params;


            var startYear = moment(self.date, "DD/MM/YYYY").format("YYYY");
            var startDate = moment('01-01-' + startYear, "DD/MM/YYYY").toDate();
            /****** Title *****/
            dataMain.title = Company.findOne();

            /****** Header *****/
            dataMain.header = params;

            /****** Content *****/


            var selector = {};
            var exchangeDate = self.exchangeDate;

            var selectorGetLastBalance = {};
            var selectorGetLastDate = {};
            //Get Last Date Closing
            if (self.date != null) {
                selectorGetLastDate.closeDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").toDate()
                };
            }
            if (self.currencyId != "All") {
                selectorGetLastDate.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorGetLastDate.branchId = self.branchId;
            }
            var lastDate = CloseChartAccount.findOne(
                selectorGetLastDate, {
                    sort: {
                        closeDate: -1
                    }
                });

            //Parameter for Balance Last End Of Process
            if (lastDate != null) {
                selectorGetLastBalance.closeDate = lastDate.closeDate;
            }
            if (self.currencyId != "All") {
                selectorGetLastBalance.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorGetLastBalance.branchId = self.branchId;
            }

            //Parameter for balance sheet
            if (lastDate != null) {
                selector.journalDate = {
                    $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, 'days').toDate(),
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate()
                };
            } else {
                selector.journalDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate()
                };
            }
            if (self.currencyId != "All") {
                selector.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selector.branchId = self.branchId;
            }

            if (self.currencyId != "All") {
                var baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }


            var content = [];
            var otherCurrentAsset = [];
            var totalOtherCurrentAsset = 0;
            var fixAsset = [];
            var totalFixAsset = 0;
            var otherFixAsset = [];
            var totalOtherFixAsset = 0;


            var otherCurrentLiability = [];
            var totalOtherCurrentLiability = 0;
            var longTermLiability = [];
            var totalLongTermLiability = 0;


            var equity = [];
            var totalEquity = 0;
            var result = [];
            var x = 1;


            //Condition to get Net Income
            var selectorProfit = {};
            if (!_.isEmpty(self.date)) {
                selectorProfit.journalDate = {
                    $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate(),
                    $gte: startDate
                };
            }
            if (self.currencyId != "All") {
                selectorProfit.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorProfit.branchId = self.branchId;
            }

            selectorProfit['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };

            var contentProfit = {};
            var resultIncome = [];
            var resultExpense = [];

            var grandTotalIncome = 0;
            var grandTotalExpense = 0;
            var profitAndLost = Meteor.call("getProfitLost", selectorProfit,
                baseCurrency, exchangeDate);
            profitAndLost.reduce(function (key, val) {
                if (!key[val.account]) {
                    var amountUsd = 0,
                        amountRiel = 0,
                        amountThb = 0;
                    if (val.currency == "USD") {
                        amountUsd = val.result;
                    } else if (val.currency == "KHR") {
                        amountRiel = val.result;
                    } else if (val.currency == "THB") {
                        amountThb = val.result;
                    }
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        currency: baseCurrency,
                        code: val.code,
                        amountUsd: amountUsd,
                        amountRiel: amountRiel,
                        amountThb: amountThb
                    };
                    if (val.accountType >= 40 && val.accountType <= 49) {
                        resultIncome.push(key[val.account]);
                    } else if (val.accountType >= 50 && val.accountType <= 59) {
                        resultExpense.push(key[val.account]);
                    }

                } else {
                    key[val.account].result += val.result;
                    if (val.currency == "USD") {
                        key[val.account].amountUsd += val.result;
                    } else if (val.currency == "KHR") {
                        key[val.account].amountRiel += val.result;
                    } else if (val.currency == "THB") {
                        key[val.account].amountThb += val.result;
                    }
                }
                if (val.accountType >= 40 && val.accountType <= 49) {
                    grandTotalIncome += val.result;
                } else if (val.accountType >= 50 && val.accountType <= 59) {
                    grandTotalExpense += val.result;
                }

                return key;
            }, {});

            contentProfit.resultIncome = resultIncome;
            contentProfit.grandTotalIncome = grandTotalIncome;
            contentProfit.resultExpense = resultExpense;
            contentProfit.grandTotalExpense = grandTotalExpense;
            contentProfit.profit = grandTotalIncome - grandTotalExpense;
            contentProfit.currencySelect = baseCurrency;


            var balanceSheet = Meteor.call("getBalanceSheet", selector,
                baseCurrency, exchangeDate, selectorGetLastBalance, lastDate,self.showNonActive);

            balanceSheet.reduce(function (key, val) {
                if (!key[val.account]) {
                    var amountUsd = 0,
                        amountRiel = 0,
                        amountThb = 0;
                    if (val.currency == "USD") {
                        amountUsd = val.result;
                    } else if (val.currency == "KHR") {
                        amountRiel = val.result;
                    } else if (val.currency == "THB") {
                        amountThb = val.result;
                    }
                    key[val.account] = {
                        result: val.result,
                        name: val.name,
                        account: val.account,
                        currency: baseCurrency,
                        code: val.code,
                        accountTypeId: val.accountTypeId,
                        level: val.level,
                        parent: val.parent == null ? "" : val.parent,
                        amountUsd: amountUsd,
                        amountRiel: amountRiel,
                        amountThb: amountThb


                    };
                    result.push(key[val.account]);
                } else {
                    key[val.account].result += val.result;
                    if (val.currency == "USD") {
                        key[val.account].amountUsd += val.result;
                    } else if (val.currency == "KHR") {
                        key[val.account].amountRiel += val.result;
                    } else if (val.currency == "THB") {
                        key[val.account].amountThb += val.result;
                    }
                }
                return key;
            }, {});


            var temporary = "";
            var isPush = true;
            var subTotal = 0;
            var data, dataOld;

            var variable = "";
            var i = 0,
                j = 0,
                k = 0,
                l = 0,
                m = 0;

            result.forEach(function (o) {

                if (o.accountTypeId == "10") {
                    totalOtherCurrentAsset += o.result;

                    // Push Total of Header when have Sub Account

                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent & isPush == false) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal
                            });
                            isPush = true;
                        }
                    }
                    // Push Header when have Sub Account

                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherCurrentAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = otherCurrentAsset;
                        } else {
                            subTotal += o.result;
                        }
                    }

                    temporary = o.parent;


                    otherCurrentAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb
                    });


                } else if (o.accountTypeId == "11") {
                    totalFixAsset += o.result;
                    if (isPush === false && i == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: subTotal
                                });
                                isPush = true;

                            }
                        }
                    }
                    i = 1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            fixAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = fixAsset;
                        } else {
                            subTotal += o.result;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal
                            });
                            isPush = true;
                        }
                    }

                    fixAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb

                    });

                } else if (o.accountTypeId == "12") {
                    totalOtherFixAsset += o.result;
                    if (isPush === false && j == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: subTotal

                                });
                                isPush = true;

                            }
                        }
                    }
                    j = 1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherFixAsset.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = otherFixAsset;
                        } else {
                            subTotal += o.result;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal
                            });
                            isPush = true;
                        }
                    }


                    otherFixAsset.push({
                        name: o.name,
                        amount: o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: o.amountUsd,
                        amountRiel: o.amountRiel,
                        amountThb: o.amountThb
                    });

                } else if (o.accountTypeId == "20") {
                    totalOtherCurrentLiability += o.result;
                    if (isPush === false && k == 0) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: subTotal
                            });
                            isPush = true;
                        }
                    }
                    k = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            otherCurrentLiability.push({
                                name: data.name,
                                code: SpaceChar.space(22 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = otherCurrentLiability;
                        } else {
                            subTotal += o.result;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal
                            });
                            isPush = true;
                        }
                    }


                    otherCurrentLiability.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(22 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                } else if (o.accountTypeId == "21") {
                    totalLongTermLiability += o.result;
                    if (isPush === false && l == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: x * subTotal
                                });
                                isPush = true;

                            }
                        }
                    }
                    l = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            longTermLiability.push({
                                name: data.name,
                                code: SpaceChar.space(22 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = longTermLiability;
                        } else {
                            subTotal += o.result;
                        }
                    }


                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal
                            });
                            isPush = true;
                        }
                    }

                    longTermLiability.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(22 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                } else if (o.accountTypeId == "30") {
                    totalEquity += o.result;

                    if (isPush === false && m == 0) {
                        if (temporary !== o.parent) {
                            if (dataOld != null) {
                                variable.push({
                                    name: dataOld.name,
                                    code: SpaceChar.space(22 + (6 * dataOld.level)) +
                                    'Total : ' + dataOld.code,
                                    amount: x * subTotal
                                });
                                isPush = true;
                            }
                        }
                    }
                    m = 1;
                    x = -1;
                    // Push Header when have Sub Account
                    if (o.level > 0) {
                        if (temporary !== o.parent) {
                            data = ChartAccount.findOne({
                                _id: o.parent
                            });
                            equity.push({
                                name: data.name,
                                code: SpaceChar.space(15 + (6 * data.level)) +
                                data.code,
                                amount: "title",
                                amountUsd: "title",
                                amountRiel: "title",
                                amountThb: "title"
                            });

                            subTotal = o.result;
                            isPush = false;
                            variable = equity;
                        } else {
                            subTotal += o.result;
                        }
                    }

                    // Push Total of Header when have Sub Account
                    temporary = o.parent;
                    dataOld = ChartAccount.findOne({
                        _id: temporary
                    });
                    if (temporary !== o.parent) {
                        if (dataOld != null) {
                            variable.push({
                                name: dataOld.name,
                                code: SpaceChar.space(15 + (6 * dataOld.level)) +
                                'Total : ' + dataOld.code,
                                amount: x * subTotal
                            });
                            isPush = true;
                        }
                    }

                    equity.push({
                        name: o.name,
                        amount: x * o.result,
                        currency: baseCurrency,
                        code: SpaceChar.space(15 + (6 * o.level)) + o.code,
                        level: o.level,
                        parent: o.parent,
                        amountUsd: x * o.amountUsd,
                        amountRiel: x * o.amountRiel,
                        amountThb: x * o.amountThb
                    });

                }
            });

            var len = 0;
            if (variable !== otherCurrentLiability && variable !==
                longTermLiability) {
                len = 15;
            } else {
                len = 22;
            }
            if (isPush === false) {
                if (dataOld != null) {
                    variable.push({
                        name: dataOld.name,
                        code: SpaceChar.space(len + (6 * dataOld.level)) +
                        'Total : ' + dataOld.code,
                        amount: x * subTotal
                    });
                    isPush = true;
                }
            }
            dataMain.profit = contentProfit.profit;

            dataMain.otherCurrentAsset = otherCurrentAsset;
            dataMain.fixAsset = fixAsset;
            dataMain.otherFixAsset = otherFixAsset;
            dataMain.otherCurrentLiability = otherCurrentLiability;
            dataMain.longTermLiability = longTermLiability;
            dataMain.equity = equity;

            dataMain.totalOtherCurrentAsset = math.round(totalOtherCurrentAsset,
                2);
            dataMain.totalFixAsset = math.round(totalFixAsset, 2);
            dataMain.totalOtherFixAsset = math.round(totalOtherFixAsset, 2);
            dataMain.totalOtherCurrentLiability = (-1) * math.round(
                    totalOtherCurrentLiability, 2);
            dataMain.totalLongTermLiability = (-1) * math.round(
                    totalLongTermLiability, 2);
            dataMain.totalEquity = ((-1) * math.round(totalEquity, 2)) + math.round(
                    contentProfit.profit, 2);

            dataMain.totalAsset = parseFloat(dataMain.totalOtherCurrentAsset) +
                parseFloat(dataMain.totalFixAsset) + parseFloat(dataMain.totalOtherFixAsset);
            dataMain.totalLiability = dataMain.totalOtherCurrentLiability +
                dataMain.totalLongTermLiability;
            dataMain.totalLiabilityAndEquity = dataMain.totalOtherCurrentLiability +
                dataMain.totalLongTermLiability + dataMain.totalEquity;

            if (math.abs(dataMain.totalAsset - dataMain.totalLiabilityAndEquity) <=
                0.05 &&
                baseCurrency == "USD") {
                dataMain.totalAsset = dataMain.totalLiabilityAndEquity;
            } else if (math.abs(dataMain.totalAsset - dataMain.totalLiabilityAndEquity) <=
                500 &&
                baseCurrency == "KHR") {
                dataMain.totalAsset = dataMain.totalLiabilityAndEquity;
            }

            dataMain.currencySelect = baseCurrency;

            if (content.length > 0) {
                dataMain.content = content;
            }

            return dataMain;
        }
    }
});
