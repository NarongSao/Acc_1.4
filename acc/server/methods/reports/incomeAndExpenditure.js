import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Setting} from '../../../../core/imports/api/collections/setting';

import {MapNBCIncome} from '../../../imports/api/collections/mapNBCIncome';
import {ChartAccount} from '../../../imports/api/collections/chartAccount';
import {Journal} from '../../../imports/api/collections/journal';
import {CloseChartAccount} from '../../../imports/api/collections/closeChartAccount';

Meteor.methods({
    acc_IncomeAndExpenditure: function (params) {
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
            data.nonInterestIncome = 0;
            data.nonInterestExpense = 0;

            data.foreignExchangeGainNet = 0;
            data.foreignExchangeGain = 0;
            data.foreignExchangeLoss = 0;

            data.otherIncome = 0;

            data.operatingIncome = 0;

            data.programExpense = 0;

            data.generalAndAdministrativeExpense = 0;
            data.personnelExpense = 0;
            data.officedExpense = 0;
            data.occupancyExpense = 0;
            data.travelExpense = 0;
            data.depreciationAndAmortization = 0;

            data.taxes = 0;

            data.otherCharges = 0;

            data.loanLossPrvisionRecoveries = 0;
            data.generalLoanLossProvisions = 0;
            data.specificLoanProvisions = 0;
            data.interestLossProvision = 0;

            data.profitFromOperation = 0;

            data.grandIncome = 0;

            data.extraodinaryItems = 0;

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
            data.nonInterestIncomeOther = 0;
            data.nonInterestExpenseOther = 0;

            data.foreignExchangeGainNetOther = 0;
            data.foreignExchangeGainOther = 0;
            data.foreignExchangeLossOther = 0;
            data.otherIncomeOther = 0;

            data.operatingIncomeOther = 0;

            data.programExpenseOther = 0;

            data.generalAndAdministrativeExpenseOther = 0;
            data.personnelExpenseOther = 0;
            data.officedExpenseOther = 0;
            data.occupancyExpenseOther = 0;
            data.travelExpenseOther = 0;
            data.depreciationAndAmortizationOther = 0;

            data.taxesOther = 0;

            data.otherChargesOther = 0;

            data.loanLossPrvisionRecoveriesOther = 0;
            data.generalLoanLossProvisionsOther = 0;
            data.specificLoanProvisionsOther = 0;
            data.interestLossProvisionOther = 0;

            data.profitFromOperationOther = 0;

            data.grandIncomeOther = 0;

            data.extraodinaryItemsOther = 0;

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
            data.nonInterestIncomeTotal = 0;
            data.nonInterestExpenseTotal = 0;

            data.foreignExchangeGainNetTotal = 0;
            data.foreignExchangeGainTotal = 0;
            data.foreignExchangeLossTotal = 0;

            data.otherIncomeTotal = 0;

            data.operatingIncomeTotal = 0;

            data.programExpenseTotal = 0;

            data.generalAndAdministrativeExpenseTotal = 0;
            data.personnelExpenseOtherTotal = 0;
            data.officedExpenseTotal = 0;
            data.occupancyExpenseTotal = 0;
            data.travelExpenseTotal = 0;
            data.depreciationAndAmortizationTotal = 0;

            data.taxesTotal = 0;

            data.otherChargesTotal = 0;

            data.loanLossPrvisionRecoveriesTotal = 0;
            data.generalLoanLossProvisionsTotal = 0;
            data.specificLoanProvisionsTotal = 0;
            data.interestLossProvisionTotal = 0;

            data.profitFromOperationTotal = 0;

            data.grandIncomeTotal = 0;

            data.extraodinaryItemsTotal = 0;

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
            data.nonInterestIncomeToDate = 0;
            data.nonInterestExpenseToDate = 0;

            data.foreignExchangeGainNetToDate = 0;
            data.foreignExchangeGainToDate = 0;
            data.foreignExchangeLossToDate = 0;

            data.otherIncomeToDate = 0;

            data.operatingIncomeToDate = 0;

            data.programExpenseToDate = 0;

            data.generalAndAdministrativeExpenseToDate = 0;
            data.personnelExpenseToDate = 0;
            data.officedExpenseToDate = 0;
            data.occupancyExpenseToDate = 0;
            data.travelExpenseToDate = 0;
            data.depreciationAndAmortizationToDate = 0;

            data.taxesToDate = 0;

            data.otherChargesToDate = 0;

            data.loanLossPrvisionRecoveriesToDate = 0;
            data.generalLoanLossProvisionsToDate = 0;
            data.specificLoanProvisionsToDate = 0;
            data.interestLossProvisionToDate = 0;

            data.profitFromOperationToDate = 0;

            data.grandIncomeToDate = 0;

            data.extraodinaryItemsToDate = 0;

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
                var nbcCode = MapNBCIncome.findOne(
                    selectorNbcCode);

                if (nbcCode != null) {
                    if (nbcCode.accountDocNBC.code == "1.1") {
                        data.loanAndAdvancesToCustomer += obj.amountRiel / 1000000;
                        data.loanAndAdvancesToCustomerOther += (obj.amountUsd + obj
                                .amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.2") {
                        data.accountWithBank += obj.amountRiel / 1000000;
                        data.accountWithBankOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.3") {
                        data.balanceWithNBC += obj.amountRiel / 1000000;
                        data.balanceWithNBCOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.4") {
                        data.incomeOther += obj.amountRiel / 1000000;
                        data.incomeOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.1") {
                        data.customerDesposits += obj.amountRiel / 1000000;
                        data.customerDespositsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.2") {
                        data.amountOwingtoBankAndOtherFin += obj.amountRiel /
                            1000000;
                        data.amountOwingtoBankAndOtherFinOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.3") {
                        data.expenseOther += obj.amountRiel / 1000000;
                        data.expenseOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2") {
                        data.nonInterestExpense += obj.amountRiel / 1000000;
                        data.nonInterestExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "5.1") {
                        data.foreignExchangeGain += obj.amountRiel / 1000000;
                        data.foreignExchangeGainOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "5.2") {
                        data.foreignExchangeLoss += obj.amountRiel / 1000000;
                        data.foreignExchangeLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6") {
                        data.otherIncome += obj.amountRiel / 1000000;
                        data.otherIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8") {
                        data.programExpense += obj.amountRiel / 1000000;
                        data.programExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.1") {
                        data.personnelExpense += obj.amountRiel / 1000000;
                        data.personnelExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.2") {
                        data.officedExpense += obj.amountRiel / 1000000;
                        data.officedExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.3") {
                        data.occupancyExpense += obj.amountRiel / 1000000;
                        data.occupancyExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.4") {
                        data.travelExpense += obj.amountRiel / 1000000;
                        data.travelExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.5") {
                        data.depreciationAndAmortization += obj.amountRiel /
                            1000000;
                        data.depreciationAndAmortizationOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "10") {
                        data.taxes += obj.amountRiel / 1000000;
                        data.taxesOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "11") {
                        data.otherCharges += obj.amountRiel / 1000000;
                        data.otherChargesOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.1") {
                        data.generalLoanLossProvisions += obj.amountRiel / 1000000;
                        data.generalLoanLossProvisionsOther += (obj.amountUsd + obj
                                .amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.2") {
                        data.specificLoanProvisions += obj.amountRiel / 1000000;
                        data.specificLoanProvisionsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.3") {
                        data.interestLossProvision += obj.amountRiel / 1000000;
                        data.interestLossProvisionOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "14") {
                        data.grandIncome += obj.amountRiel / 1000000;
                        data.grandIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "15") {
                        data.extraodinaryItems += obj.amountRiel / 1000000;
                        data.extraodinaryItemsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "17") {
                        data.taxOnProfit += obj.amountRiel / 1000000;
                        data.taxOnProfitOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "19") {
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
                var nbcCode = MapNBCIncome.findOne(
                    selectorNbcCodeEx);
                if (nbcCode != null) {
                    if (nbcCode.accountDocNBC.code == "1.1") {
                        data.loanAndAdvancesToCustomer += obj.amountRiel / 1000000;
                        data.loanAndAdvancesToCustomerOther += (obj.amountUsd + obj
                                .amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.2") {
                        data.accountWithBank += obj.amountRiel / 1000000;
                        data.accountWithBankOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.3") {
                        data.balanceWithNBC += obj.amountRiel / 1000000;
                        data.balanceWithNBCOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "1.4") {
                        data.incomeOther += obj.amountRiel / 1000000;
                        data.incomeOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.1") {
                        data.customerDesposits += obj.amountRiel / 1000000;
                        data.customerDespositsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.2") {
                        data.amountOwingtoBankAndOtherFin += obj.amountRiel /
                            1000000;
                        data.amountOwingtoBankAndOtherFinOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "2.3") {
                        data.expenseOther += obj.amountRiel / 1000000;
                        data.expenseOtherOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.1") {
                        data.nonInterestIncome += obj.amountRiel / 1000000;
                        data.nonInterestIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "4.2") {
                        data.nonInterestExpense += obj.amountRiel / 1000000;
                        data.nonInterestExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "5.1") {
                        data.foreignExchangeGain += obj.amountRiel / 1000000;
                        data.foreignExchangeGainOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "5.2") {
                        data.foreignExchangeLoss += obj.amountRiel / 1000000;
                        data.foreignExchangeLossOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "6") {
                        data.otherIncome += obj.amountRiel / 1000000;
                        data.otherIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "8") {
                        data.programExpense += obj.amountRiel / 1000000;
                        data.programExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.1") {
                        data.personnelExpense += obj.amountRiel / 1000000;
                        data.personnelExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.2") {
                        data.officedExpense += obj.amountRiel / 1000000;
                        data.officedExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.3") {
                        data.occupancyExpense += obj.amountRiel / 1000000;
                        data.occupancyExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.4") {
                        data.travelExpense += obj.amountRiel / 1000000;
                        data.travelExpenseOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "9.5") {
                        data.depreciationAndAmortization += obj.amountRiel /
                            1000000;
                        data.depreciationAndAmortizationOther += (obj.amountUsd +
                            obj.amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "10") {
                        data.taxes += obj.amountRiel / 1000000;
                        data.taxesOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "11") {
                        data.otherCharges += obj.amountRiel / 1000000;
                        data.otherChargesOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.1") {
                        data.generalLoanLossProvisions += obj.amountRiel / 1000000;
                        data.generalLoanLossProvisionsOther += (obj.amountUsd + obj
                                .amountThb) / 1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.2") {
                        data.specificLoanProvisions += obj.amountRiel / 1000000;
                        data.specificLoanProvisionsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "12.3") {
                        data.interestLossProvision += obj.amountRiel / 1000000;
                        data.interestLossProvisionOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "14") {
                        data.grandIncome += obj.amountRiel / 1000000;
                        data.grandIncomeOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "15") {
                        data.extraodinaryItems += obj.amountRiel / 1000000;
                        data.extraodinaryItemsOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "17") {
                        data.taxOnProfit += obj.amountRiel / 1000000;
                        data.taxOnProfitOther += (obj.amountUsd + obj.amountThb) /
                            1000000;

                    } else if (nbcCode.accountDocNBC.code == "19") {
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
            data.balanceWithNBCTotal = math.round(data.balanceWithNBC, 2) + math.round(
                    data.balanceWithNBCOther, 2);
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
            data.programExpenseTotal = math.round(data.programExpense, 2) + math.round(
                    data.programExpenseOther, 2);
            data.personnelExpenseTotal = math.round(data.personnelExpense, 2) +
                math.round(data.personnelExpenseOther, 2);
            data.officedExpenseTotal = math.round(data.officedExpense, 2) + math.round(
                    data.officedExpenseOther, 2);
            data.occupancyExpenseTotal = math.round(data.occupancyExpense, 2) +
                math.round(data.occupancyExpenseOther, 2);
            data.travelExpenseTotal = math.round(data.travelExpense, 2) + math.round(
                    data.travelExpenseOther, 2);
            data.depreciationAndAmortizationTotal = math.round(data.depreciationAndAmortization,
                    2) + math.round(data.depreciationAndAmortizationOther, 2);
            data.taxesTotal = math.round(data.taxes, 2) + math.round(data.taxesOther,
                    2);
            data.otherChargesTotal = math.round(data.otherCharges, 2) + math.round(
                    data.otherChargesOther, 2);
            data.generalLoanLossProvisionsTotal = math.round(data.generalLoanLossProvisions,
                    2) + math.round(data.generalLoanLossProvisionsOther, 2);
            data.specificLoanProvisionsTotal = math.round(data.specificLoanProvisions,
                    2) + math.round(data.specificLoanProvisionsOther, 2);
            data.interestLossProvisionTotal = math.round(data.interestLossProvision,
                    2) + math.round(data.interestLossProvisionOther, 2);
            data.grandIncomeTotal = math.round(data.grandIncome, 2) + math.round(
                    data.grandIncomeOther, 2);
            data.extraodinaryItemsTotal = math.round(data.extraodinaryItems, 2) +
                math.round(data.extraodinaryItemsOther, 2);
            data.taxOnProfitTotal = math.round(data.taxOnProfit, 2) + math.round(
                    data.taxOnProfitOther, 2);
            data.dividendPaymentsTotal = math.round(data.dividendPayments, 2) +
                math.round(data.dividendPaymentsOther, 2);

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
                    var nbcCode = MapNBCIncome.findOne(
                        selectorNbcCodeToDate);
                    if (nbcCode != null) {
                        if (nbcCode.accountDocNBC.code == "1.1") {
                            data.loanAndAdvancesToCustomerToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "1.2") {
                            data.accountWithBankToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "1.3") {
                            data.balanceWithNBCToDate += (-1) * obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "1.4") {
                            data.incomeOtherToDate += (-1) * obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "2.1") {
                            data.customerDespositsToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "2.2") {
                            data.amountOwingtoBankAndOtherFinToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "2.3") {
                            data.expenseOtherToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.1") {
                            data.nonInterestIncomeToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "4.2") {
                            data.nonInterestExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "5.1") {
                            data.foreignExchangeGainToDate += (-1) * obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "5.2") {
                            data.foreignExchangeLossToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "6") {
                            data.otherIncomeToDate += (-1) * obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "8") {
                            data.programExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.1") {
                            data.personnelExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.2") {
                            data.officedExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.3") {
                            data.occupancyExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.4") {
                            data.travelExpenseToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "9.5") {
                            data.depreciationAndAmortizationToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "10") {
                            data.taxesToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "11") {
                            data.otherChargesToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "12.1") {
                            data.generalLoanLossProvisionsToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "12.2") {
                            data.specificLoanProvisionsToDate += obj.balance /
                                1000000;
                        } else if (nbcCode.accountDocNBC.code == "12.3") {
                            data.interestLossProvisionToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "14") {
                            data.grandIncomeToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "15") {
                            data.extraodinaryItemsToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "17") {
                            data.taxOnProfitToDate += obj.balance / 1000000;
                        } else if (nbcCode.accountDocNBC.code == "19") {
                            data.dividendPaymentsToDate += obj.balance / 1000000;
                        }
                    }
                }
            });

            data.interestIncome = math.round(data.loanAndAdvancesToCustomer, 2) +
                math.round(data.accountWithBank, 2) + math.round(data.balanceWithNBC,
                    2) + math.round(data.incomeOther, 2);
            data.interestIncomeOther = math.round(data.loanAndAdvancesToCustomerOther,
                    2) + math.round(data.accountWithBankOther, 2) + math.round(data.balanceWithNBCOther,
                    2) + math.round(data.incomeOtherOther, 2);
            data.interestIncomeTotal = math.round(data.loanAndAdvancesToCustomerTotal,
                    2) + math.round(data.accountWithBankTotal, 2) + math.round(data.balanceWithNBCTotal,
                    2) + math.round(data.incomeOtherTotal, 2);
            data.interestIncomeToDate = math.round(data.loanAndAdvancesToCustomerToDate,
                    2) + math.round(data.accountWithBankToDate, 2) + math.round(data.balanceWithNBCToDate,
                    2) + math.round(data.incomeOtherToDate, 2);

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

            data.nonInterestIncomeNet = math.round(data.nonInterestIncome, 2) -
                math.round(data.nonInterestExpense, 2);
            data.nonInterestIncomeNetOther = math.round(data.nonInterestIncomeOther,
                    2) - math.round(data.nonInterestExpenseOther, 2);
            data.nonInterestIncomeNetTotal = math.round(data.nonInterestIncomeTotal,
                    2) - math.round(data.nonInterestExpenseTotal, 2);
            data.nonInterestIncomeNetToDate = math.round(data.nonInterestIncomeToDate,
                    2) - math.round(data.nonInterestExpenseToDate, 2);

            data.foreignExchangeGainNet = math.round(data.foreignExchangeGain, 2) -
                math.round(data.foreignExchangeLoss, 2);
            data.foreignExchangeGainNetOther = math.round(data.foreignExchangeGainOther,
                    2) - math.round(data.foreignExchangeLossOther, 2);
            data.foreignExchangeGainNetTotal = math.round(data.foreignExchangeGainTotal,
                    2) - math.round(data.foreignExchangeLossTotal, 2);
            data.foreignExchangeGainNetToDate = math.round(data.foreignExchangeGainToDate,
                    2) - math.round(data.foreignExchangeLossToDate, 2);

            data.operatingIncome = math.round(data.netInterestIncome, 2) + math.round(
                    data.nonInterestIncomeNet, 2) + math.round(data.foreignExchangeGainNet,
                    2) + math.round(data.otherIncome, 2);
            data.operatingIncomeOther = math.round(data.netInterestIncomeOther, 2) +
                math.round(data.nonInterestIncomeNetOther, 2) + math.round(data.foreignExchangeGainNetOther,
                    2) + math.round(data.otherIncomeOther, 2);
            data.operatingIncomeTotal = math.round(data.netInterestIncomeTotal, 2) +
                math.round(data.nonInterestIncomeNetTotal, 2) + math.round(data.foreignExchangeGainNetTotal,
                    2) + math.round(data.otherIncomeTotal, 2);
            data.operatingIncomeToDate = math.round(data.netInterestIncomeToDate,
                    2) + math.round(data.nonInterestIncomeNetToDate, 2) + math.round(
                    data.foreignExchangeGainNetToDate, 2) + math.round(data.otherIncomeToDate,
                    2);

            data.generalAndAdministrativeExpense = math.round(data.personnelExpense,
                    2) + math.round(data.officedExpense, 2) + math.round(data.occupancyExpense,
                    2) + math.round(data.travelExpense, 2) + math.round(data.depreciationAndAmortization,
                    2);
            data.generalAndAdministrativeExpenseOther = math.round(data.personnelExpenseOther,
                    2) + math.round(data.officedExpenseOther, 2) + math.round(data.occupancyExpenseOther,
                    2) + math.round(data.travelExpenseOther, 2) + math.round(data.depreciationAndAmortizationOther,
                    2);
            data.generalAndAdministrativeExpenseTotal = math.round(data.personnelExpenseTotal,
                    2) + math.round(data.officedExpenseTotal, 2) + math.round(data.occupancyExpenseTotal,
                    2) + math.round(data.travelExpenseTotal, 2) + math.round(data.depreciationAndAmortizationTotal,
                    2);
            data.generalAndAdministrativeExpenseToDate = math.round(data.personnelExpenseToDate,
                    2) + math.round(data.officedExpenseToDate, 2) + math.round(data.occupancyExpenseToDate,
                    2) + math.round(data.travelExpenseToDate, 2) + math.round(data.depreciationAndAmortizationToDate,
                    2);


            data.loanLossPrvisionRecoveries = math.round(data.generalLoanLossProvisions,
                    2) + math.round(data.specificLoanProvisions, 2) + math.round(data
                    .interestLossProvision, 2);
            data.loanLossPrvisionRecoveriesOther = math.round(data.generalLoanLossProvisionsOther,
                    2) + math.round(data.specificLoanProvisionsOther, 2) + math.round(
                    data.interestLossProvisionOther, 2);
            data.loanLossPrvisionRecoveriesTotal = math.round(data.generalLoanLossProvisionsTotal,
                    2) + math.round(data.specificLoanProvisionsTotal, 2) + math.round(
                    data.interestLossProvisionTotal, 2);
            data.loanLossPrvisionRecoveriesToDate = math.round(data.generalLoanLossProvisionsToDate,
                    2) + math.round(data.specificLoanProvisionsToDate, 2) + math.round(
                    data.interestLossProvisionToDate, 2);

            data.profitFromOperation = math.round(data.operatingIncome, 2) - math
                    .round(data.programExpense, 2) - math.round(data.generalAndAdministrativeExpense,
                    2) - math.round(data.taxes, 2) - math.round(data.otherCharges, 2) -
                math.round(data.loanLossPrvisionRecoveries, 2);
            data.profitFromOperationOther = math.round(data.operatingIncomeOther,
                    2) - math.round(data.programExpenseOther, 2) - math.round(data.generalAndAdministrativeExpenseOther,
                    2) - math.round(data.taxesOther, 2) - math.round(data.otherChargesOther,
                    2) - math.round(data.loanLossPrvisionRecoveriesOther, 2);
            data.profitFromOperationTotal = math.round(data.operatingIncomeTotal,
                    2) - math.round(data.programExpenseTotal, 2) - math.round(data.generalAndAdministrativeExpenseTotal,
                    2) - math.round(data.taxesTotal, 2) - math.round(data.otherChargesTotal,
                    2) - math.round(data.loanLossPrvisionRecoveriesTotal, 2);
            data.profitFromOperationToDate = math.round(data.operatingIncomeToDate,
                    2) - math.round(data.programExpenseToDate, 2) - math.round(data.generalAndAdministrativeExpenseToDate,
                    2) - math.round(data.taxesToDate, 2) - math.round(data.otherChargesToDate,
                    2) - math.round(data.loanLossPrvisionRecoveriesToDate, 2);

            data.profitBeforeTaxes = math.round(data.profitFromOperation, 2) +
                math.round(data.grandIncome, 2) + math.round(data.extraodinaryItems,
                    2);
            data.profitBeforeTaxesOther = math.round(data.profitFromOperationOther,
                    2) + math.round(data.grandIncomeOther, 2) + math.round(data.extraodinaryItemsOther,
                    2);
            data.profitBeforeTaxesTotal = math.round(data.profitFromOperationTotal,
                    2) + math.round(data.grandIncomeTotal, 2) + math.round(data.extraodinaryItemsTotal,
                    2);
            data.profitBeforeTaxesToDate = math.round(data.profitFromOperationToDate,
                    2) + math.round(data.grandIncomeToDate, 2) + math.round(data.extraodinaryItemsToDate,
                    2);

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
