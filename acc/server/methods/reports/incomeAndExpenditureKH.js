import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Setting} from '../../../../core/imports/api/collections/setting';

import {MapNBCIncomeKH} from '../../../imports/api/collections/mapNBCIncomeKH';
import {ChartAccount} from '../../../imports/api/collections/chartAccount';
import {CloseChartAccount} from '../../../imports/api/collections/closeChartAccount';
import {Journal} from '../../../imports/api/collections/journal';

Meteor.methods({
    acc_IncomeAndExpenditureKh: function (params) {
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


            var startYear = moment(date[0], "DD/MM/YYYY").format("YYYY");
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


            if (self.branchId != "All") {
                selector.branchId = self.branchId;
            }

            selector['transaction.accountDoc.accountTypeId'] = {
                $gte: "40",
                $lte: "59"
            };


            var baseCurrency = 'KHR';


            var content = {};
            var resultIncome = [];
            var resultExpense = [];

            var grandTotalIncome = 0;
            var grandTotalExpense = 0;

            var contentProfit = Meteor.call("getProfitLostNBC", selector,
                baseCurrency, exchangeDate);
            contentProfit.reduce(function (key, val) {
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
                        grandTotalIncome += val.result;
                        resultIncome.push(key[val.account]);
                    } else if (val.accountType >= 50 && val.accountType <= 59) {
                        grandTotalExpense += val.result;
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

                    if (val.accountType >= 40 && val.accountType <= 49) {
                        grandTotalIncome += val.result;
                    } else if (val.accountType >= 50 && val.accountType <= 59) {
                        grandTotalExpense += val.result;
                    }
                }
                return key;
            }, {});

            data.interestIncome = 0;
            data.loanAndAdvancesToCustomer = 0;
            data.accountWithBank = 0;
            data.balanceWithNBC = 0;
            data.incomeOther = 0;


            data.interestExpensesAndSimilarCharge = 0;
            data.customerDesposits = 0;
            data.amountOwingtoBankAndOtherFin = 0;
            data.expenseOther = 0;

            data.netInterestIncome = 0;

            data.nonInterestIncomeNet = 0;
            data.netCommission = 0;
            data.nonInterestIncome = 0;
            data.nonInterestExpense = 0;

            data.foreignExchangeGainNet = 0;
            data.foreignExchangeGain = 0;
            data.foreignExchangeLoss = 0;

            data.otherIncome = 0;

            data.operatingIncome = 0;


            data.generalAndAdministrativeExpense = 0;
            data.salaryExpense = 0;
            data.buildingExpense = 0;
            data.personalExpense = 0;
            data.materialExpense = 0;
            data.officedExpense = 0;
            data.occupancyExpense = 0;
            data.occupancyWithBank = 0;
            data.rentExpense = 0;
            data.depreExpense = 0;
            data.otherExpense = 0;

            data.netIncome = 0;
            data.reverse = 0;
            data.reverseOnLoss = 0;
            data.return = 0;
            data.other = 0;
            data.specailChapter = 0;
            data.specialIncome = 0;
            data.specialIncomeGift = 0;
            data.specialExpense = 0;


            data.profitBeforeTaxes = 0;

            data.taxOnProfit = 0;

            data.netProfitForPeriod = 0;

            data.dividendPayments = 0;

            data.netProfitAvailableAfterDividend = 0;
            /*
             * Other
             * */
            data.interestIncomeOther = 0;
            data.loanAndAdvancesToCustomerOther = 0;
            data.accountWithBankOther = 0;
            data.balanceWithNBCOther = 0;
            data.incomeOtherOther = 0;


            data.interestExpensesAndSimilarChargeOther = 0;
            data.customerDespositsOther = 0;
            data.amountOwingtoBankAndOtherFinOther = 0;
            data.expenseOtherOther = 0;

            data.netInterestIncomeOther = 0;

            data.nonInterestIncomeNetOther = 0;
            data.netCommissionOther = 0;
            data.nonInterestIncomeOther = 0;
            data.nonInterestExpenseOther = 0;

            data.foreignExchangeGainNetOther = 0;
            data.foreignExchangeGainOther = 0;
            data.foreignExchangeLossOther = 0;

            data.otherIncomeOther = 0;

            data.operatingIncomeOther = 0;


            data.generalAndAdministrativeExpenseOther = 0;
            data.salaryExpenseOther = 0;
            data.buildingExpenseOther = 0;
            data.personalExpenseOther = 0;
            data.materialExpenseOther = 0;
            data.officedExpenseOther = 0;
            data.occupancyExpenseOther = 0;
            data.occupancyWithBankOther = 0;
            data.rentExpenseOther = 0;
            data.depreExpenseOther = 0;
            data.otherExpenseOther = 0;

            data.netIncomeOther = 0;
            data.reverseOther = 0;
            data.reverseOnLossOther = 0;
            data.returnOther = 0;
            data.otherOther = 0;
            data.specailChapterOther = 0;
            data.specialIncomeOther = 0;
            data.specialIncomeGiftOther = 0;
            data.specialExpenseOther = 0;


            data.profitBeforeTaxesOther = 0;

            data.taxOnProfitOther = 0;

            data.netProfitForPeriodOther = 0;

            data.dividendPaymentsOther = 0;

            data.netProfitAvailableAfterDividendOther = 0;

            /*
             * Total
             * */
            data.interestIncomeTotal = 0;
            data.loanAndAdvancesToCustomerTotal = 0;
            data.accountWithBankTotal = 0;
            data.balanceWithNBCTotal = 0;
            data.incomeOtherTotal = 0;


            data.interestExpensesAndSimilarChargeTotal = 0;
            data.customerDespositsTotal = 0;
            data.amountOwingtoBankAndOtherFinTotal = 0;
            data.expenseOtherTotal = 0;

            data.netInterestIncomeTotal = 0;

            data.nonInterestIncomeNetTotal = 0;
            data.netCommissionTotal = 0;
            data.nonInterestIncomeTotal = 0;
            data.nonInterestExpenseTotal = 0;

            data.foreignExchangeGainNetTotal = 0;
            data.foreignExchangeGainTotal = 0;
            data.foreignExchangeLossTotal = 0;

            data.otherIncomeTotal = 0;

            data.operatingIncomeTotal = 0;


            data.generalAndAdministrativeExpenseTotal = 0;
            data.salaryExpenseTotal = 0;
            data.buildingExpenseTotal = 0;
            data.personalExpenseTotal = 0;
            data.materialExpenseTotal = 0;
            data.officedExpenseTotal = 0;
            data.occupancyExpenseTotal = 0;
            data.occupancyWithBankTotal = 0;
            data.rentExpenseTotal = 0;
            data.depreExpenseTotal = 0;
            data.otherExpenseTotal = 0;

            data.netIncomeTotal = 0;
            data.reverseTotal = 0;
            data.reverseOnLossTotal = 0;
            data.returnTotal = 0;
            data.otherTotal = 0;
            data.specailChapterTotal = 0;
            data.specialIncomeTotal = 0;
            data.specialIncomeGiftTotal = 0;
            data.specialExpenseTotal = 0;


            data.profitBeforeTaxesTotal = 0;

            data.taxOnProfitTotal = 0;

            data.netProfitForPeriodTotal = 0;

            data.dividendPaymentsTotal = 0;

            data.netProfitAvailableAfterDividendTotal = 0;
            /*
             * ToDate
             * */
            data.interestIncomeToDate = 0;
            data.loanAndAdvancesToCustomerToDate = 0;
            data.accountWithBankToDate = 0;
            data.balanceWithNBCToDate = 0;
            data.incomeOtherToDate = 0;


            data.interestExpensesAndSimilarChargeToDate = 0;
            data.customerDespositsToDate = 0;
            data.amountOwingtoBankAndOtherFinToDate = 0;
            data.expenseOtherToDate = 0;

            data.netInterestIncomeToDate = 0;

            data.nonInterestIncomeNetToDate = 0;
            data.netCommissionToDate = 0;
            data.nonInterestIncomeToDate = 0;
            data.nonInterestExpenseToDate = 0;

            data.foreignExchangeGainNetToDate = 0;
            data.foreignExchangeGainToDate = 0;
            data.foreignExchangeLossToDate = 0;

            data.otherIncomeToDate = 0;

            data.operatingIncomeToDate = 0;


            data.generalAndAdministrativeExpenseToDate = 0;
            data.salaryExpenseToDate = 0;
            data.buildingExpenseToDate = 0;
            data.personalExpenseToDate = 0;
            data.materialExpenseToDate = 0;
            data.officedExpenseToDate = 0;
            data.occupancyExpenseToDate = 0;
            data.occupancyWithBankToDate = 0;
            data.rentExpenseToDate = 0;
            data.depreExpenseToDate = 0;
            data.otherExpenseToDate = 0;

            data.netIncomeToDate = 0;
            data.reverseToDate = 0;
            data.reverseOnLossToDate = 0;
            data.returnToDate = 0;
            data.otherToDate = 0;
            data.specailChapterToDate = 0;
            data.specialIncomeToDate = 0;
            data.specialIncomeGiftToDate = 0;
            data.specialExpenseToDate = 0;


            data.profitBeforeTaxesToDate = 0;

            data.taxOnProfitToDate = 0;

            data.netProfitForPeriodToDate = 0;

            data.dividendPaymentsToDate = 0;

            data.netProfitAvailableAfterDividendToDate = 0;


            var accountCode = "";
            var selectorNbcCode = {};

            resultIncome.forEach(function (obj) {
                accountCode = obj.code.substr(0, 6);
                selectorNbcCode['transaction.accountDoc.code'] = new RegExp("^" +
                    accountCode, "m");
                var nbcCode = MapNBCIncomeKH.findOne(
                    selectorNbcCode);

                if (nbcCode != null) {
                    if (nbcCode.accountDocNBC.code == "1.1") {
                        data.accountWithBank += obj.amountRiel / 1000000;
                        data.accountWithBankOther += (obj.amountUsd + obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.2") {
                        data.loanAndAdvancesToCustomer += obj.amountRiel / 1000000;
                        data.loanAndAdvancesToCustomerOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.3") {
                        data.incomeOther += obj.amountRiel / 1000000;
                        data.incomeOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.1") {
                        data.amountOwingtoBankAndOtherFin += obj.amountRiel / 1000000;
                        data.amountOwingtoBankAndOtherFinOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.2") {
                        data.customerDesposits += obj.amountRiel /
                            1000000;
                        data.customerDespositsOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.3") {
                        data.expenseOther += obj.amountRiel / 1000000;
                        data.expenseOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1.1") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1.2") {
                        data.nonInterestExpense += obj.amountRiel / 1000000;
                        data.nonInterestExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2.1") {
                        data.foreignExchangeGain += obj.amountRiel / 1000000;
                        data.foreignExchangeGainOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2.2") {
                        data.foreignExchangeLoss += obj.amountRiel / 1000000;
                        data.foreignExchangeLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.3") {
                        data.otherIncome += obj.amountRiel / 1000000;
                        data.otherIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.1") {
                        data.salaryExpense += obj.amountRiel / 1000000;
                        data.salaryExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.2") {
                        data.personalExpense += obj.amountRiel / 1000000;
                        data.personalExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.3") {
                        data.rentExpense += obj.amountRiel / 1000000;
                        data.rentExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.4") {
                        data.buildingExpense += obj.amountRiel / 1000000;
                        data.buildingExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.5") {
                        data.materialExpense += obj.amountRiel / 1000000;
                        data.materialExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.6") {
                        data.officedExpense += obj.amountRiel / 1000000;
                        data.officedExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.7") {
                        data.depreExpense += obj.amountRiel / 1000000;
                        data.depreExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.8.1") {
                        data.occupancyWithBank += obj.amountRiel / 1000000;
                        data.occupancyWithBankOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.9") {
                        data.otherExpense += obj.amountRiel / 1000000;
                        data.otherExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.1") {
                        data.reverseOnLoss += obj.amountRiel / 1000000;
                        data.reverseOnLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.2") {
                        data.return += obj.amountRiel / 1000000;
                        data.returnOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.3") {
                        data.other += obj.amountRiel / 1000000;
                        data.otherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.1.1") {
                        data.specialIncomeGift += obj.amountRiel / 1000000;
                        data.specialIncomeGiftOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.2") {
                        data.specialExpense += obj.amountRiel /
                            1000000;
                        data.specialExpenseOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "11") {
                        data.taxOnProfit += obj.amountRiel / 1000000;
                        data.taxOnProfitOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "13") {
                        data.dividendPayments += obj.amountRiel / 1000000;
                        data.dividendPaymentsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    }
                }
            });

            var selectorNbcCodeEx = {};
            resultExpense.forEach(function (obj) {
                accountCode = obj.code.substr(0, 6);
                selectorNbcCodeEx['transaction.accountDoc.code'] = new RegExp(
                    "^" + accountCode, "m");
                var nbcCode = MapNBCIncomeKH.findOne(
                    selectorNbcCodeEx);
                if (nbcCode != null) {
                    if (nbcCode.accountDocNBC.code == "1.1") {
                        data.accountWithBank += obj.amountRiel / 1000000;
                        data.accountWithBankOther += (obj.amountUsd + obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.2") {
                        data.loanAndAdvancesToCustomer += obj.amountRiel / 1000000;
                        data.loanAndAdvancesToCustomerOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.3") {
                        data.incomeOther += obj.amountRiel / 1000000;
                        data.incomeOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.1") {
                        data.amountOwingtoBankAndOtherFin += obj.amountRiel / 1000000;
                        data.amountOwingtoBankAndOtherFinOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.2") {
                        data.customerDesposits += obj.amountRiel /
                            1000000;
                        data.customerDespositsOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.3") {
                        data.expenseOther += obj.amountRiel / 1000000;
                        data.expenseOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1.1") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1.2") {
                        data.nonInterestExpense += obj.amountRiel / 1000000;
                        data.nonInterestExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2.1") {
                        data.foreignExchangeGain += obj.amountRiel / 1000000;
                        data.foreignExchangeGainOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2.2") {
                        data.foreignExchangeLoss += obj.amountRiel / 1000000;
                        data.foreignExchangeLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.3") {
                        data.otherIncome += obj.amountRiel / 1000000;
                        data.otherIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.1") {
                        data.salaryExpense += obj.amountRiel / 1000000;
                        data.salaryExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.2") {
                        data.personalExpense += obj.amountRiel / 1000000;
                        data.personalExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.3") {
                        data.rentExpense += obj.amountRiel / 1000000;
                        data.rentExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.4") {
                        data.buildingExpense += obj.amountRiel / 1000000;
                        data.buildingExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.5") {
                        data.materialExpense += obj.amountRiel / 1000000;
                        data.materialExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.6") {
                        data.officedExpense += obj.amountRiel / 1000000;
                        data.officedExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.7") {
                        data.depreExpense += obj.amountRiel / 1000000;
                        data.depreExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.8.1") {
                        data.occupancyWithBank += obj.amountRiel / 1000000;
                        data.occupancyWithBankOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6.9") {
                        data.otherExpense += obj.amountRiel / 1000000;
                        data.otherExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.1") {
                        data.reverseOnLoss += obj.amountRiel / 1000000;
                        data.reverseOnLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.2") {
                        data.return += obj.amountRiel / 1000000;
                        data.returnOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8.3") {
                        data.other += obj.amountRiel / 1000000;
                        data.otherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.1.1") {
                        data.specialIncomeGift += obj.amountRiel / 1000000;
                        data.specialIncomeGiftOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.2") {
                        data.specialExpense += obj.amountRiel /
                            1000000;
                        data.specialExpenseOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "11") {
                        data.taxOnProfit += obj.amountRiel / 1000000;
                        data.taxOnProfitOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "13") {
                        data.dividendPayments += obj.amountRiel / 1000000;
                        data.dividendPaymentsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    }
                }
            });


            data.loanAndAdvancesToCustomerTotal = math.round(data.loanAndAdvancesToCustomer,
                    2) + math.round(data.loanAndAdvancesToCustomerOther, 2);
            data.accountWithBankTotal = math.round(data.accountWithBank, 2) +
                math.round(data.accountWithBankOther, 2);

            data.incomeOtherTotal = math.round(data.incomeOther, 2) + math.round(
                    data.incomeOtherOther, 2);
            data.customerDespositsTotal = math.round(data.customerDesposits, 2) +
                math.round(data.customerDespositsOther, 2);
            data.amountOwingtoBankAndOtherFinTotal = math.round(data.amountOwingtoBankAndOtherFin,
                    2) + math.round(data.amountOwingtoBankAndOtherFinOther, 2);
            data.expenseOtherTotal = math.round(data.expenseOther, 2) + math.round(
                    data.expenseOtherOther, 2);
            data.nonInterestIncomeTotal = math.round(data.nonInterestIncome, 2) +
                math.round(data.nonInterestIncomeOther, 2);
            data.nonInterestExpenseTotal = math.round(data.nonInterestExpense, 2) +
                math.round(data.nonInterestExpenseOther, 2);


            data.foreignExchangeGainTotal = math.round(data.foreignExchangeGain,
                    2) + math.round(data.foreignExchangeGainOther, 2);
            data.foreignExchangeLossTotal = math.round(data.foreignExchangeLoss,
                    2) + math.round(data.foreignExchangeLossOther, 2);
            data.otherIncomeTotal = math.round(data.otherIncome, 2) + math.round(
                    data.otherIncomeOther, 2);


            data.salaryExpenseTotal = math.round(data.salaryExpense, 2) + math.round(
                    data.salaryExpenseOther, 2);
            data.personalExpenseTotal = math.round(data.personalExpense, 2) +
                math.round(data.personalExpenseOther, 2);

            data.rentExpenseTotal = math.round(data.rentExpense, 2) +
                math.round(data.rentExpenseOther, 2);

            data.buildingExpenseTotal = math.round(data.buildingExpense, 2) +
                math.round(data.buildingExpenseOther, 2);

            data.materialExpenseTotal = math.round(data.materialExpense, 2) +
                math.round(data.materialExpenseOther, 2);

            data.officedExpenseTotal = math.round(data.officedExpense, 2) + math.round(
                    data.officedExpenseOther, 2);
            data.occupancyWithBankTotal = math.round(data.occupancyWithBank, 2) +
                math.round(data.occupancyWithBankOther, 2);

            data.depreExpenseTotal = math.round(data.depreExpense, 2) + math.round(
                    data.depreExpenseOther, 2);
            data.otherExpenseTotal = math.round(data.otherExpense, 2) + math.round(
                    data.otherExpenseOther, 2);


            data.reverseOnLossTotal = math.round(data.reverseOnLoss,
                    2) + math.round(data.reverseOnLossOther, 2);

            data.returnTotal = math.round(data.return, 2) + math.round(
                    data.returnOther, 2);


            data.otherTotal = math.round(data.other,
                    2) + math.round(data.otherOther, 2);

            data.specialIncomeGiftTotal = math.round(data.specialIncomeGift,
                    2) + math.round(data.specialIncomeGiftOther, 2);
            data.specialExpenseTotal = math.round(data.specialExpense,
                    2) + math.round(data.specialExpenseOther, 2);

            data.taxOnProfitTotal = math.round(data.taxOnProfit, 2) + math.round(
                    data.taxOnProfitOther, 2);
            data.dividendPaymentsTotal = math.round(data.dividendPayments, 2) +
                math.round(data.dividendPaymentsOther, 2);
            data.netProfitAvailableAfterDividendTotal = math.round(data.netProfitAvailableAfterDividend, 2) +
                math.round(data.netProfitAvailableAfterDividendOther, 2);

            /*
             * Year TO Date
             *
             * */
            var selectorChartAccount = {};
            var selectorAdvanced = {};
            var selectorGetLastDate = {};
            var selectorGetLastBalance = {};

            var content = [];
            var endingBalance = 0;
            var endingAmount = 0;
            var endingDr = 0;
            var endingCr = 0;


            selectorChartAccount.accountTypeId = {
                $gte: "40",
                $lte: "59"
            };

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

                    if (self.branchId != "All") {
                        selectorGetLastDate.branchId = self.branchId;
                    }

                    // selectorGetLastDate.closeChartAccountId = obj._id;

                    var lastDate = CloseChartAccount.findOne(
                        selectorGetLastDate, {
                            sort: {
                                closeDate: -1
                            }
                        });


                    //Get Balance From Close to Date Query
                    if (lastDate != null) {
                        selectorGetLastBalance.closeDate = {
                            $eq: lastDate.closeDate
                        }
                    }
                    if (self.branchId != "All") {
                        selectorGetLastBalance.branchId = self.branchId;
                    }
                    selectorGetLastBalance.closeChartAccountId = obj._id;
                    var lastBalanceClose = 0;
                    if (lastDate != null) {
                        var resultLast = CloseChartAccount.find(
                            selectorGetLastBalance);
                        if (resultLast != null) {
                            resultLast.forEach(function (lastBal) {
                                var re = Meteor.call('exchangeNBC', lastBal.currencyId,
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
                            $gte: startDate,
                            $lt: fDate
                        };
                    }
                    if (self.branchId != "All") {
                        selectorAdvanced.branchId = self.branchId;
                    }

                    Journal.find(selectorAdvanced)
                        .forEach(function (oldData) {
                            oldData.transaction.forEach(function (oldDataTran) {
                                if (oldDataTran.accountDoc._id == obj._id) {
                                    var convertDrcrOld = Meteor.call('exchangeNBC',
                                        oldData.currencyId, baseCurrency, oldDataTran
                                            .drcr, exchangeDate);
                                    balanceOld += convertDrcrOld;
                                }
                            })
                        });
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
                                var convertDrcr = Meteor.call('exchangeNBC', ob.currencyId,
                                    baseCurrency, o.drcr, exchangeDate);
                                var convertDr = Meteor.call('exchangeNBC', ob.currencyId,
                                    baseCurrency, o.dr, exchangeDate);
                                var convertCr = Meteor.call('exchangeNBC', ob.currencyId,
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
                        drcr: totalDrCr,
                        balance: balance,
                        dr: totalDr,
                        cr: totalCr,
                        endingCr: endingCr,
                        currencyId: baseCurrency,
                        code: obj.code
                    });

                });

            var selectorNbcCodeToDate = {};
            content.forEach(function (obj) {
                if (obj.isHeader == false && obj.isFooter == true) {
                    accountCode = obj.code.substr(0, 6);
                    selectorNbcCodeToDate['transaction.accountDoc.code'] = new RegExp(
                        "^" + accountCode, "m");
                    var nbcCode = MapNBCIncomeKH.findOne(
                        selectorNbcCodeToDate);
                    if (nbcCode != null) {
                        if (nbcCode.accountDocNBC.code == "1.1") {
                            data.accountWithBankToDate += (-1) * obj.balance /
                                1000000;

                        } else if (nbcCode.accountDocNBC.code == "1.2") {
                            data.loanAndAdvancesToCustomerToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "1.3") {
                            data.incomeOtherToDate += (-1) * obj.balance / 1000000;

                        } else if (nbcCode.accountDocNBC.code == "2.1") {
                            data.amountOwingtoBankAndOtherFinToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "2.2") {
                            data.customerDespositsToDate += obj.balance / 1000000;

                        } else if (nbcCode.accountDocNBC.code == "2.3") {
                            data.expenseOtherToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.1.1") {
                            data.nonInterestIncomeToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.1.2") {
                            data.nonInterestExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.2.1") {
                            data.foreignExchangeGainToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.2.2") {
                            data.foreignExchangeLossToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.3") {
                            data.otherIncomeToDate += (-1) * obj.balance / 1000000;
                        }

                        else if (nbcCode.accountDocNBC.code == "6.1") {
                            data.salaryExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.2") {
                            data.personalExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.3") {
                            data.rentExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.4") {
                            data.buildingExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.5") {
                            data.materialExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.6") {
                            data.officedExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.7") {
                            data.depreExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.8.1") {
                            data.occupancyWithBankToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6.9") {
                            data.otherExpenseToDate += obj.balance / 1000000;
                        }


                        else if (nbcCode.accountDocNBC.code == "8.1") {
                            data.reverseOnLossToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "8.2") {
                            data.returnToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "8.3") {
                            data.otherToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.1.1") {
                            data.specialIncomeGiftToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.2") {
                            data.specialExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "11") {
                            data.taxOnProfitToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "13") {
                            data.dividendPaymentsToDate += obj.balance / 1000000;
                        }
                    }
                }
            });


            data.interestIncome = math.round(data.loanAndAdvancesToCustomer, 2) +
                math.round(data.accountWithBank, 2) + math.round(data.incomeOther, 2);
            data.interestIncomeOther = math.round(data.loanAndAdvancesToCustomerOther,
                    2) + math.round(data.accountWithBankOther, 2) + math.round(data.incomeOtherOther, 2);
            data.interestIncomeTotal = math.round(data.loanAndAdvancesToCustomerTotal,
                    2) + math.round(data.accountWithBankTotal, 2) + math.round(data.incomeOtherTotal, 2);
            data.interestIncomeToDate = math.round(data.loanAndAdvancesToCustomerToDate,
                    2) + math.round(data.accountWithBankToDate, 2) + math.round(data.incomeOtherToDate, 2);


            data.interestExpensesAndSimilarCharge = math.round(data.customerDesposits,
                    2) + math.round(data.amountOwingtoBankAndOtherFin, 2) + math.round(
                    data.expenseOther, 2);
            data.interestExpensesAndSimilarChargeOther = math.round(data.customerDespositsOther,
                    2) + math.round(data.amountOwingtoBankAndOtherFinOther, 2) + math
                    .round(data.expenseOtherOther, 2);
            data.interestExpensesAndSimilarChargeTotal = math.round(data.customerDespositsTotal,
                    2) + math.round(data.amountOwingtoBankAndOtherFinTotal, 2) + math
                    .round(data.expenseOtherTotal, 2);
            data.interestExpensesAndSimilarChargeToDate = math.round(data.customerDespositsToDate,
                    2) + math.round(data.amountOwingtoBankAndOtherFinToDate, 2) +
                math.round(data.expenseOtherToDate, 2);


            data.netInterestIncome = math.round(data.interestIncome, 2) - math.round(
                    data.interestExpensesAndSimilarCharge, 2);
            data.netInterestIncomeOther = math.round(data.interestIncomeOther, 2) -
                math.round(data.interestExpensesAndSimilarChargeOther, 2);
            data.netInterestIncomeTotal = math.round(data.interestIncomeTotal, 2) -
                math.round(data.interestExpensesAndSimilarChargeTotal, 2);
            data.netInterestIncomeToDate = math.round(data.interestIncomeToDate,
                    2) - math.round(data.interestExpensesAndSimilarChargeToDate, 2);


            data.netCommission = math.round(data.nonInterestIncome, 2) -
                math.round(data.nonInterestExpense, 2);
            data.netCommissionOther = math.round(data.nonInterestIncomeOther,
                    2) - math.round(data.nonInterestExpenseOther, 2);
            data.netCommissionTotal = math.round(data.nonInterestIncomeTotal,
                    2) - math.round(data.nonInterestExpenseTotal, 2);
            data.netCommissionToDate = math.round(data.nonInterestIncomeToDate,
                    2) - math.round(data.nonInterestExpenseToDate, 2);


            data.foreignExchangeGainNet = math.round(data.foreignExchangeGain, 2) -
                math.round(data.foreignExchangeLoss, 2);
            data.foreignExchangeGainNetOther = math.round(data.foreignExchangeGainOther,
                    2) - math.round(data.foreignExchangeLossOther, 2);
            data.foreignExchangeGainNetTotal = math.round(data.foreignExchangeGainTotal,
                    2) - math.round(data.foreignExchangeLossTotal, 2);
            data.foreignExchangeGainNetToDate = math.round(data.foreignExchangeGainToDate,
                    2) - math.round(data.foreignExchangeLossToDate, 2);


            data.nonInterestIncomeNet = math.round(data.netCommission, 2) + math.round(data.foreignExchangeGainNet,
                    2) + math.round(data.otherIncome, 2);
            data.nonInterestIncomeNetOther = math.round(data.netCommissionOther, 2) + math.round(data.foreignExchangeGainNetOther,
                    2) + math.round(data.otherIncomeOther, 2);
            data.nonInterestIncomeNetTotal = math.round(data.netCommissionTotal, 2) + math.round(data.foreignExchangeGainNetTotal,
                    2) + math.round(data.otherIncomeTotal, 2);
            data.nonInterestIncomeNetToDate = math.round(data.netCommissionToDate, 2) + math.round(data.foreignExchangeGainNetToDate,
                    2) + math.round(data.otherIncomeToDate, 2);

            data.operatingIncome = math.round(data.netInterestIncome, 2) + math.round(data.nonInterestIncomeNet, 2);
            data.operatingIncomeOther = math.round(data.netInterestIncomeOther, 2) + math.round(data.nonInterestIncomeNetOther, 2);
            data.operatingIncomeTotal = math.round(data.netInterestIncomeTotal, 2) + math.round(data.nonInterestIncomeNetTotal, 2);
            data.operatingIncomeToDate = math.round(data.netInterestIncomeToDate, 2) + math.round(data.nonInterestIncomeNetToDate, 2);


            data.generalAndAdministrativeExpense = math.round(data.salaryExpense,
                    2) + math.round(data.officedExpense, 2) + math.round(data.personalExpense, 2)
                + math.round(data.rentExpense, 2) + math.round(data.buildingExpense, 2)
                + math.round(data.materialExpense, 2) + math.round(data.depreExpense, 2)
                + math.round(data.occupancyWithBank, 2) + math.round(data.otherExpense, 2);

            data.generalAndAdministrativeExpenseOther = math.round(data.salaryExpenseOther,
                    2) + math.round(data.officedExpenseOther, 2) + math.round(data.personalExpenseOther, 2)
                + math.round(data.rentExpenseOther, 2) + math.round(data.buildingExpenseOther, 2)
                + math.round(data.materialExpenseOther, 2) + math.round(data.depreExpenseOther, 2)
                + math.round(data.occupancyWithBankOther, 2) + math.round(data.otherExpenseOther, 2);

            data.generalAndAdministrativeExpenseTotal = math.round(data.salaryExpenseTotal,
                    2) + math.round(data.officedExpenseTotal, 2) + math.round(data.personalExpenseTotal, 2)
                + math.round(data.rentExpenseTotal, 2) + math.round(data.buildingExpenseTotal, 2)
                + math.round(data.materialExpenseTotal, 2) + math.round(data.depreExpenseTotal, 2)
                + math.round(data.occupancyWithBankTotal, 2) + math.round(data.otherExpenseTotal, 2);

            data.generalAndAdministrativeExpenseToDate = math.round(data.salaryExpenseToDate,
                    2) + math.round(data.officedExpenseToDate, 2) + math.round(data.personalExpenseToDate, 2)
                + math.round(data.rentExpenseToDate, 2) + math.round(data.buildingExpenseToDate, 2)
                + math.round(data.materialExpenseToDate, 2) + math.round(data.depreExpenseToDate, 2)
                + math.round(data.occupancyWithBankToDate, 2) + math.round(data.otherExpenseToDate, 2);


            data.netIncome = math.round(data.operatingIncome, 2) - math.round(data.generalAndAdministrativeExpense, 2);
            data.netIncomeOther = math.round(data.operatingIncomeOther, 2) - math.round(data.generalAndAdministrativeExpenseOther, 2);
            data.netIncomeTotal = math.round(data.operatingIncomeTotal, 2) - math.round(data.generalAndAdministrativeExpenseTotal, 2);
            data.netIncomeToDate = math.round(data.operatingIncomeToDate, 2) - math.round(data.generalAndAdministrativeExpenseToDate, 2);


            data.reverse = math.round(data.reverseOnLoss, 2) - math.round(data.return, 2) + math.round(data.other, 2);
            data.reverseOther = math.round(data.reverseOnLossOther, 2) - math.round(data.returnOther, 2) + math.round(data.otherOther, 2);
            data.reverseTotal = math.round(data.reverseOnLossTotal, 2) - math.round(data.returnTotal, 2) + math.round(data.otherTotal, 2);
            data.reverseToDate = math.round(data.reverseOnLossToDate, 2) - math.round(data.returnToDate, 2) + math.round(data.otherToDate, 2);


            data.specialIncome = math.round(data.specialIncomeGift, 2);
            data.specialIncomeOther = math.round(data.specialIncomeGiftOther, 2);
            data.specialIncomeTotal = math.round(data.specialIncomeGiftTotal, 2);
            data.specialIncomeToDate = math.round(data.specialIncomeGiftToDate, 2);

            data.specailChapter = math.round(data.specialIncome, 2) - math.round(data.specialExpense, 2);
            data.specailChapterOther = math.round(data.specialIncomeOther, 2) - math.round(data.specialExpenseOther, 2);
            data.specailChapterTotal = math.round(data.specialIncomeTotal, 2) - math.round(data.specialExpenseTotal, 2);
            data.specailChapterToDate = math.round(data.specialIncomeToDate, 2) - math.round(data.specialExpenseToDate, 2);


            data.profitBeforeTaxes = math.round(data.netIncome, 2) + math.round(data.reverse, 2) + math.round(data.specailChapter, 2);
            data.profitBeforeTaxesOther = math.round(data.netIncomeOther, 2) + math.round(data.reverseOther, 2) + math.round(data.specailChapterOther, 2);
            data.profitBeforeTaxesTotal = math.round(data.netIncomeTotal, 2) + math.round(data.reverseTotal, 2) + math.round(data.specailChapterTotal, 2);
            data.profitBeforeTaxesToDate = math.round(data.netIncomeToDate, 2) + math.round(data.reverseToDate, 2) + math.round(data.specailChapterToDate, 2);


            data.netProfitForPeriod = math.round(data.profitBeforeTaxes, 2) -
                math.round(data.taxOnProfit, 2);
            data.netProfitForPeriodOther = math.round(data.profitBeforeTaxesOther,
                    2) - math.round(data.taxOnProfitOther, 2);
            data.netProfitForPeriodTotal = math.round(data.profitBeforeTaxesTotal,
                    2) - math.round(data.taxOnProfitTotal, 2);
            data.netProfitForPeriodToDate = math.round(data.profitBeforeTaxesToDate,
                    2) - math.round(data.taxOnProfitToDate, 2);

            data.netProfitAvailableAfterDividend = math.round(data.netProfitForPeriod,
                    2) + math.round(data.dividendPayments, 2);
            data.netProfitAvailableAfterDividendOther = math.round(data.netProfitForPeriodOther,
                    2) + math.round(data.dividendPaymentsOther, 2);
            data.netProfitAvailableAfterDividendTotal = math.round(data.netProfitForPeriodTotal,
                    2) + math.round(data.dividendPaymentsTotal, 2);
            data.netProfitAvailableAfterDividendToDate = math.round(data.netProfitForPeriodToDate,
                    2) + math.round(data.dividendPaymentsToDate, 2);

            return data;
        }
    }
});
