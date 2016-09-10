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
import {ChartAccount} from '../../../imports/api/collections/chartAccount';
import {SpaceChar} from '../../../common/configs/space';

Meteor.methods({
    acc_profitLost: function (params) {
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

            var startYear = new Date(fDate).getFullYear();
            var startDate = moment('01-01-' + startYear, "DD/MM/YYYY").toDate();

            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;
            /****** Content *****/

            var self = params;
            var selector = {};
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

            selector['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };


            if (self.currencyId != "All") {
                var baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }


            var content = {};
            var resultIncome = [];
            var resultExpense = [];

            var grandTotalIncome = 0;
            var grandTotalExpense = 0;

            var grandTotalIncomeYearToDate = 0;
            var grandTotalExpenseYearToDate = 0;


            //To get Last Date of CLose Chart Account
            var selectorEnd = {};
            if (self.branchId != "All") {
                selectorEnd.branchId = self.branchId;
            }
            selectorEnd.closeDate = {
                $gte: startDate,
                $lt: moment(date[0], "DD/MM/YYYY").add(1, 'days').toDate()
            }
            var endDate = CloseChartAccount.findOne(selectorEnd, {
                sort: {
                    closeDate: -1
                }
            });
            // Select to get from CLose Chart Account
            var selectorEndDate = {};
            if (endDate != undefined) {
                if (self.currencyId != "All") {
                    selectorEndDate.currencyId = self.currencyId;
                }
                if (self.branchId != "All") {
                    selectorEndDate.branchId = self.branchId;
                }

                selectorEndDate.accountTypeId = {
                    $gte: "40",
                    $lte: "59"
                };
                selectorEndDate.closeDate = {
                    $eq: endDate.closeDate
                }
            }

            // Selector Middle
            var selectorMiddle = {};
            if (!_.isUndefined(endDate)) {
                selectorMiddle.journalDate = {
                    $gte: moment(moment(endDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, 'days').toDate(),
                    $lt: fDate
                };
            } else {
                selectorMiddle.journalDate = {
                    $gte: startDate,
                    $lt: fDate
                };
            }


            if (self.currencyId != "All") {
                selectorMiddle.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorMiddle.branchId = self.branchId;
            }

            selectorMiddle['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };

            var contentProfit = Meteor.call("getProfitLostYearToDate", selector,
                baseCurrency, exchangeDate, selectorMiddle, selectorEndDate,self.showNonActive);


            var subTotalExpense = 0;
            var temporaryExpense = "";
            var isPushExpense = true;

            var subTotalIncome = 0;
            var temporaryIncome = "";
            var isPushIncome = true;

            var subTotalExpenseYearToDate = 0;

            var subTotalIncomeYearToDate = 0;

            contentProfit.reduce(function (key, val) {
                if (val.thisMonth == true) {
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
                            resultYearToDate: val.result,
                            name: val.name,
                            currency: baseCurrency,
                            code: val.code,
                            amountUsd: amountUsd,
                            amountRiel: amountRiel,
                            amountThb: amountThb,
                            parent: val.parent,
                            level: val.level
                        };
                        if (val.accountType >= 40 && val.accountType <= 49) {
                            resultIncome.push(key[val.account]);
                            grandTotalIncome += math.round(val.result, 2);
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {
                            resultExpense.push(key[val.account]);
                            grandTotalExpense += math.round(val.result, 2);
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    } else {
                        key[val.account].result += math.round(val.result, 2);
                        key[val.account].resultYearToDate += math.round(val.result,
                            2);
                        if (val.currency == "USD") {
                            key[val.account].amountUsd += math.round(val.value, 2);
                        } else if (val.currency == "KHR") {
                            key[val.account].amountRiel += math.round(val.value, 2);
                        } else if (val.currency == "THB") {
                            key[val.account].amountThb += math.round(val.value, 2);
                        }

                        if (val.accountType >= 40 && val.accountType <= 49) {
                            grandTotalIncome += math.round(val.result, 2);
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {
                            grandTotalExpense += math.round(val.result, 2);
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    }
                } else {
                    if (!key[val.account]) {
                        key[val.account] = {
                            result: 0,
                            resultYearToDate: val.result,
                            name: val.name,
                            currency: baseCurrency,
                            code: val.code,
                            amountUsd: amountUsd,
                            amountRiel: amountRiel,
                            amountThb: amountThb,
                            parent: val.parent,
                            level: val.level
                        };
                        if (val.accountType >= 40 && val.accountType <= 49) {
                            resultIncome.push(key[val.account]);
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {
                            resultExpense.push(key[val.account]);
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    } else {
                        key[val.account].resultYearToDate += math.round(val.result,
                            2);
                        if (val.accountType >= 40 && val.accountType <= 49) {
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    }
                }
                return key;
            }, {});


            var resultIncomeFinal = [];
            resultIncome.sort(compare);
            resultIncome.map(function (obj) {
                if (temporaryIncome !== obj.parent & isPushIncome == false) {
                    resultIncomeFinal.push({
                        name: dataIncome.name,
                        code: SpaceChar.space(6 * dataIncome.level) +
                        'Total : ' + dataIncome.code,
                        result: subTotalIncome,
                        resultYearToDate: subTotalIncomeYearToDate
                    });
                    isPushIncome = true;

                }
                if (obj.level > 0) {
                    if (temporaryIncome !== obj.parent) {
                        dataIncome = ChartAccount.findOne({
                            _id: obj.parent
                        });
                        resultIncomeFinal.push({
                            name: dataIncome.name,
                            code: SpaceChar.space(6 * dataIncome.level) +
                            dataIncome.code,
                            result: "title",
                            resultYearToDate: "title"
                        });

                        subTotalIncome = obj.result;
                        subTotalIncomeYearToDate = obj.resultYearToDate;

                    } else {
                        subTotalIncomeYearToDate += obj.resultYearToDate;
                        subTotalIncome += obj.result;
                    }
                    isPushIncome = false;
                }
                temporaryIncome = obj.parent;
                resultIncomeFinal.push({
                    result: obj.result,
                    resultYearToDate: obj.resultYearToDate,
                    name: obj.name,
                    currency: obj.currency,
                    code: SpaceChar.space(6 * obj.level) + obj.code,
                    parent: obj.parent,
                    level: obj.level
                });

            });


            var resultEnpenseFinal = [];

            resultExpense.sort(compare);

            resultExpense.map(function (obj) {
                if (temporaryExpense !== obj.parent & isPushExpense == false) {
                    resultEnpenseFinal.push({
                        name: dataExpense.name,
                        code: SpaceChar.space(6 * dataExpense.level) +
                        'Total : ' + dataExpense.code,
                        result: subTotalExpense,
                        resultYearToDate: subTotalExpenseYearToDate
                    });
                    isPushExpense = true;

                }
                if (obj.level > 0) {
                    if (temporaryExpense !== obj.parent) {
                        dataExpense = ChartAccount.findOne({
                            _id: obj.parent
                        });
                        resultEnpenseFinal.push({
                            name: dataExpense.name,
                            code: SpaceChar.space(6 * dataExpense.level) +
                            dataExpense.code,
                            result: "title",
                            resultYearToDate: "title"
                        });

                        subTotalExpense = obj.result;
                        subTotalExpenseYearToDate = obj.resultYearToDate;

                    } else {
                        subTotalExpenseYearToDate += obj.resultYearToDate;
                        subTotalExpense += obj.result;
                    }
                    isPushExpense = false;
                }
                temporaryExpense = obj.parent;
                resultEnpenseFinal.push({
                    result: obj.result,
                    resultYearToDate: obj.resultYearToDate,
                    name: obj.name,
                    currency: obj.currency,
                    code: SpaceChar.space(6 * obj.level) + obj.code,
                    parent: obj.parent,
                    level: obj.level
                });

            });


            data.resultIncome = resultIncomeFinal;
            data.grandTotalIncome = grandTotalIncome;
            data.grandTotalIncomeYearToDate = grandTotalIncomeYearToDate;

            data.resultExpense = resultEnpenseFinal;
            data.grandTotalExpense = grandTotalExpense;
            data.grandTotalExpenseYearToDate = grandTotalExpenseYearToDate;

            data.profit = grandTotalIncome - grandTotalExpense;
            data.profitYearToDate = grandTotalIncomeYearToDate - grandTotalExpenseYearToDate;

            data.currencySelect = baseCurrency;

            if (content.length > 0) {
                data.content = content;
            }

            return data;
        }
    },
    acc_profitLostForAll: function (params) {
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


            var startYear = new Date(fDate).getFullYear();
            var startDate = moment('01-01-' + startYear, "DD/MM/YYYY").toDate();
            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;
            /****** Content *****/
            var self = params;
            var selector = {};
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

            selector['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };


            if (self.currencyId != "All") {
                var baseCurrency = self.currencyId;
            } else {
                baseCurrency = Setting.findOne().baseCurrency;
            }


            var grandTotalIncomeYearToDate = 0;
            var grandTotalExpenseYearToDate = 0;


            //To get Last Date of CLose Chart Account
            var selectorEnd = {};
            if (self.branchId != "All") {
                selectorEnd.branchId = self.branchId;
            }
            selectorEnd.closeDate = {
                $gte: startDate,
                $lt: moment(date[0], "DD/MM/YYYY").add(1, 'days').toDate()
            }
            var endDate = CloseChartAccount.findOne(selectorEnd, {
                sort: {
                    closeDate: -1
                }
            });

            // Select to get from CLose Chart Account
            var selectorEndDate = {};
            if (endDate != undefined) {
                if (self.currencyId != "All") {
                    selectorEndDate.currencyId = self.currencyId;
                }
                if (self.branchId != "All") {
                    selectorEndDate.branchId = self.branchId;
                }

                selectorEndDate.accountTypeId = {
                    $gte: "40",
                    $lte: "59"
                };
                selectorEndDate.closeDate = {
                    $eq: endDate.closeDate
                }
            }

            // Selector Middle
            var selectorMiddle = {};
            if (!_.isUndefined(endDate)) {
                selectorMiddle.journalDate = {
                    $gte: moment(moment(endDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, 'days').toDate(),
                    $lt: fDate
                };
            } else {
                selectorMiddle.journalDate = {
                    $gte: startDate,
                    $lt: fDate
                };
            }


            if (self.currencyId != "All") {
                selectorMiddle.currencyId = self.currencyId;
            }
            if (self.branchId != "All") {
                selectorMiddle.branchId = self.branchId;
            }

            selectorMiddle['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };

            var content = {};
            var resultIncome = [];
            var resultExpense = [];

            var grandTotalIncome = 0;
            var grandTotalIncomeUSD = 0;
            var grandTotalIncomeR = 0;
            var grandTotalIncomeB = 0;
            var grandTotalExpenseUSD = 0;
            var grandTotalExpenseR = 0;
            var grandTotalExpenseB = 0;
            var grandTotalExpense = 0;

            /*var contentProfit = Meteor.call("getProfitLost", selector,
             baseCurrency, exchangeDate);*/
            var contentProfit = Meteor.call("getProfitLostYearToDate", selector,
                baseCurrency, exchangeDate, selectorMiddle, selectorEndDate,self.showNonActive);


            var subTotalExpense = 0;
            var subTotalUSDExpense = 0;
            var subTotalRielExpense = 0;
            var subTotalTHBExpense = 0;
            var temporaryExpense = "";
            var isPushExpense = true;

            var subTotalIncome = 0;
            var subTotalUSDIncome = 0;
            var subTotalRielIncome = 0;
            var subTotalTHBIncome = 0;
            var temporaryIncome = "";
            var isPushIncome = true;

            var subTotalExpenseYearToDate = 0;

            var subTotalIncomeYearToDate = 0;
            contentProfit.reduce(function (key, val) {
                if (val.thisMonth == true) {
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
                            account: val.account,
                            result: val.result,
                            resultYearToDate: val.result,
                            name: val.name,
                            currency: baseCurrency,
                            code: val.code,
                            amountUsd: amountUsd,
                            amountRiel: amountRiel,
                            amountThb: amountThb,
                            parent: val.parent,
                            level: val.level
                        };
                        if (val.accountType >= 40 && val.accountType <= 49) {
                            resultIncome.push(key[val.account]);
                        }
                        else if (val.accountType >= 50 && val.accountType <= 59) {
                            resultExpense.push(key[val.account]);
                        }

                    }
                    else {
                        key[val.account].result += math.round(val.result, 2);
                        key[val.account].resultYearToDate += math.round(val.result, 2);

                        if (val.currency == "USD") {
                            key[val.account].amountUsd += math.round(val.value, 2);
                        } else if (val.currency == "KHR") {
                            key[val.account].amountRiel += math.round(val.value, 2);
                        } else if (val.currency == "THB") {
                            key[val.account].amountThb += math.round(val.value, 2);
                        }
                    }
                    if (val.accountType >= 40 && val.accountType <= 49) {
                        grandTotalIncome += math.round(val.result, 2);
                        grandTotalIncomeYearToDate += math.round(val.result, 2);
                        if (val.currency == "USD") {
                            grandTotalIncomeUSD += math.round(val.value, 2);
                        } else if (val.currency == "KHR") {
                            grandTotalIncomeR += math.round(val.value, 2);
                        } else if (val.currency == "THB") {
                            grandTotalIncomeB += math.round(val.value, 2);
                        }
                    }
                    else if (val.accountType >= 50 && val.accountType <= 59) {
                        grandTotalExpense += math.round(val.result, 2);
                        grandTotalExpenseYearToDate += math.round(val.result, 2);

                        if (val.currency == "USD") {
                            grandTotalExpenseUSD += math.round(val.value, 2);
                        } else if (val.currency == "KHR") {
                            grandTotalExpenseR += math.round(val.value, 2);
                        } else if (val.currency == "THB") {
                            grandTotalExpenseB += math.round(val.value, 2);
                        }
                    }
                }
                else {
                    if (!key[val.account]) {
                        key[val.account] = {
                            account: val.account,
                            result: 0,
                            resultYearToDate: val.result,
                            name: val.name,
                            currency: baseCurrency,
                            code: val.code,
                            amountUsd: 0,
                            amountRiel: 0,
                            amountThb: 0,
                            parent: val.parent,
                            level: val.level
                        };
                        if (val.accountType >= 40 && val.accountType <= 49) {

                            resultIncome.push(key[val.account]);
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {

                            resultExpense.push(key[val.account]);
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    }
                    else {
                        key[val.account].resultYearToDate += math.round(val.result, 2);

                        if (val.accountType >= 40 && val.accountType <= 49) {
                            grandTotalIncomeYearToDate += math.round(val.result, 2);
                        } else if (val.accountType >= 50 && val.accountType <= 59) {
                            grandTotalExpenseYearToDate += math.round(val.result, 2);
                        }
                    }
                }
                return key;
            }, {});

            

            var resultIncomeFinal = [];
            resultIncome.sort(compare);

            resultIncome.map(function (obj) {
                if (temporaryIncome !== obj.parent & isPushIncome == false) {
                    resultIncomeFinal.push({
                        name: dataIncome.name,
                        code: SpaceChar.space(6 * dataIncome.level) +
                        'Total : ' + dataIncome.code,
                        result: subTotalIncome,
                        amountUsd: subTotalUSDIncome,
                        amountRiel: subTotalRielIncome,
                        amountThb: subTotalTHBIncome,
                        resultYearToDate: subTotalIncomeYearToDate
                    });
                    isPushIncome = true;

                }
                if (obj.level > 0) {
                    if (temporaryIncome !== obj.parent) {
                        dataIncome = ChartAccount.findOne({
                            _id: obj.parent
                        });
                        resultIncomeFinal.push({
                            name: dataIncome.name,
                            code: SpaceChar.space(6 * dataIncome.level) +
                            dataIncome.code,
                            result: "title",
                            resultYearToDate: "title",
                            amountUsd: "title",
                            amountRiel: "title",
                            amountThb: "title"
                        });

                        subTotalIncome = obj.result;
                        subTotalIncomeYearToDate = obj.resultYearToDate;
                        subTotalUSDIncome = obj.amountUsd;
                        subTotalRielIncome = obj.amountRiel;
                        subTotalTHBIncome = obj.amountThb;

                    } else {
                        subTotalIncomeYearToDate += obj.resultYearToDate;
                        subTotalIncome += obj.result;
                        subTotalUSDIncome += obj.amountUsd;
                        subTotalRielIncome += obj.amountRiel;
                        subTotalTHBIncome += obj.amountThb;
                    }
                    isPushIncome = false;
                }
                temporaryIncome = obj.parent;
                resultIncomeFinal.push({
                    result: obj.result,
                    resultYearToDate: obj.resultYearToDate,
                    name: obj.name,
                    currency: obj.currency,
                    code: SpaceChar.space(6 * obj.level) + obj.code,
                    amountUsd: obj.amountUsd,
                    amountRiel: obj.amountRiel,
                    amountThb: obj.amountThb,
                    parent: obj.parent,
                    level: obj.level
                });

            });


            var resultEnpenseFinal = [];

            resultExpense.sort(compare);
            resultExpense.map(function (obj) {
                if (temporaryExpense !== obj.parent & isPushExpense == false) {
                    resultEnpenseFinal.push({
                        name: dataExpense.name,
                        code: SpaceChar.space(6 * dataExpense.level) +
                        'Total : ' + dataExpense.code,
                        result: subTotalExpense,
                        amountUsd: subTotalUSDExpense,
                        amountRiel: subTotalRielExpense,
                        amountThb: subTotalTHBExpense,
                        resultYearToDate: subTotalExpenseYearToDate
                    });
                    isPushExpense = true;

                }
                if (obj.level > 0) {
                    if (temporaryExpense !== obj.parent) {
                        dataExpense = ChartAccount.findOne({
                            _id: obj.parent
                        });
                        resultEnpenseFinal.push({
                            name: dataExpense.name,
                            code: SpaceChar.space(6 * dataExpense.level) +
                            dataExpense.code,
                            result: "title",
                            resultYearToDate: "title",
                            amountUsd: "title",
                            amountRiel: "title",
                            amountThb: "title"
                        });

                        subTotalExpense = obj.result;
                        subTotalExpenseYearToDate = obj.resultYearToDate;
                        subTotalUSDExpense = obj.amountUsd;
                        subTotalRielExpense = obj.amountRiel;
                        subTotalTHBExpense = obj.amountThb;

                    } else {
                        subTotalExpenseYearToDate += obj.resultYearToDate;
                        subTotalExpense += obj.result;
                        subTotalUSDExpense += obj.amountUsd;
                        subTotalRielExpense += obj.amountRiel;
                        subTotalTHBExpense += obj.amountThb;
                    }
                    isPushExpense = false;
                }
                temporaryExpense = obj.parent;
                resultEnpenseFinal.push({
                    result: obj.result,
                    resultYearToDate: obj.resultYearToDate,
                    name: obj.name,
                    currency: obj.currency,
                    code: SpaceChar.space(6 * obj.level) + obj.code,
                    amountUsd: obj.amountUsd,
                    amountRiel: obj.amountRiel,
                    amountThb: obj.amountThb,
                    parent: obj.parent,
                    level: obj.level
                });

            });


            data.resultIncome = resultIncomeFinal;
            data.grandTotalIncome = grandTotalIncome;
            data.grandTotalIncomeYearToDate = grandTotalIncomeYearToDate;

            //data.resultExpense = resultExpense;
            data.resultExpense = resultEnpenseFinal;
            data.grandTotalIncomeUSD = grandTotalIncomeUSD;
            data.grandTotalIncomeR = grandTotalIncomeR;
            data.grandTotalIncomeB = grandTotalIncomeB;

            data.grandTotalExpense = grandTotalExpense;
            data.grandTotalExpenseYearToDate = grandTotalExpenseYearToDate;
            data.grandTotalExpenseUSD = grandTotalExpenseUSD;
            data.grandTotalExpenseR = grandTotalExpenseR;
            data.grandTotalExpenseB = grandTotalExpenseB;


            data.profit = grandTotalIncome - grandTotalExpense;
            data.profitYearToDate = grandTotalIncomeYearToDate - grandTotalExpenseYearToDate;
            data.profitUSD = grandTotalIncomeUSD - grandTotalExpenseUSD;
            data.profitR = grandTotalIncomeR - grandTotalExpenseR;
            data.profitB = grandTotalIncomeB - grandTotalExpenseB;

            data.currencySelect = baseCurrency;
            if (content.length > 0) {
                data.content = content;
            }

            return data;
        }
    }
});

function compare(a, b) {
    if (a.code < b.code) {
        return -1;
    } else if (a.code > b.code) {
        return 1;
    } else {
        return 0;
    }
}
