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
import {MapNBCBalance} from '../../../imports/api/collections/mapNBCBalance';

Meteor.methods({
  acc_BalanceSheetNBC: function(params) {
    if (!this.isSimulation) {
      var data = {
        title: {},
        header: {},
        content: [{
          index: 'No Result'
        }],
        footer: {}
      };


      /****** Title *****/
      data.title = Company.findOne();

      /****** Header *****/
      data.header = params;


      /****** Content *****/
      var self = params;
      var selector = {};
      var exchangeDate = self.exchangeDate;

      var selectorGetLastDate = {};
      var selectorGetLastBalance = {};

      var startYear = moment(self.date, "DD/MM/YYYY").format("YYYY");
      var startDate = moment('01-01-' + startYear, "DD/MM/YYYY").toDate();

      //Get Last Date Closing
      if (self.date != null) {
        selectorGetLastDate.closeDate = {
          $lt: moment(self.date, "DD/MM/YYYY").toDate()
        };
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
      if (self.branchId != "All") {
        selectorGetLastBalance.branchId = self.branchId;
      }

      //Parameter for balance sheet
      if (lastDate != null) {
        selector.journalDate = {
          $gte: moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, "days").toDate(),
          $lt: moment(self.date, "DD/MM/YYYY").add(1, "days").toDate()
        };
      } else {
        selector.journalDate = {
          $lt: moment(self.date, "DD/MM/YYYY").add(1, "days").toDate(),
          $gte: startDate
        };
      }
      if (self.branchId != "All") {
        selector.branchId = self.branchId;
      }


      //Condition to get Net Income
      var selectorProfit = {};
      if (!_.isEmpty(self.date)) {
        selectorProfit.journalDate = {
          $lt: moment(self.date, "DD/MM/YYYY").add(1, 'days').toDate(),
          $gte: startDate
        };
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
      var grandTotalIncomeR = 0;
      var grandTotalIncomeB = 0;
      var grandTotalExpenseUSD = 0;
      var grandTotalExpenseR = 0;
      var grandTotalExpenseB = 0;
      var grandTotalExpense = 0;
      var baseCurrency = "KHR";

      var profitAndLost = Meteor.call("getProfitLostNBC", selectorProfit,
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
          if (val.currency == "USD") {
            grandTotalIncomeUSD += val.result;
          } else if (val.currency == "KHR") {
            grandTotalIncomeR += val.result;
          } else if (val.currency == "THB") {
            grandTotalIncomeB += val.result;
          }
        } else if (val.accountType >= 50 && val.accountType <= 59) {
          grandTotalExpense += val.result;
          if (val.currency == "USD") {
            grandTotalExpenseUSD += val.result;
          } else if (val.currency == "KHR") {
            grandTotalExpenseR += val.result;
          } else if (val.currency == "THB") {
            grandTotalExpenseB += val.result;
          }
        }

        return key;
      }, {});

      contentProfit.resultIncome = resultIncome;
      contentProfit.grandTotalIncome = grandTotalIncome;
      contentProfit.grandTotalIncomeUSD = grandTotalIncomeUSD;
      contentProfit.grandTotalIncomeR = grandTotalIncomeR;
      contentProfit.grandTotalIncomeB = grandTotalIncomeB;
      contentProfit.resultExpense = resultExpense;
      contentProfit.grandTotalExpenseUSD = grandTotalExpenseUSD;
      contentProfit.grandTotalExpenseR = grandTotalExpenseR;
      contentProfit.grandTotalExpenseB = grandTotalExpenseB;
      contentProfit.grandTotalExpense = grandTotalExpense;

      contentProfit.profit = grandTotalIncome - grandTotalExpense;
      contentProfit.profitUSD = grandTotalIncomeUSD - grandTotalExpenseUSD;
      contentProfit.profitR = grandTotalIncomeR - grandTotalExpenseR;
      contentProfit.profitB = grandTotalIncomeB - grandTotalExpenseB;
      contentProfit.currencySelect = baseCurrency;


      var result = [];
      //New Balance
      var balanceSheet = Meteor.call("getBalanceSheetNBC", selector,
          baseCurrency, exchangeDate, selectorGetLastBalance, lastDate);
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
          key[val.account].result += math.round(val.result, 2);
          if (val.currency == "USD") {
            key[val.account].amountUsd += math.round(val.result, 2);
          } else if (val.currency == "KHR") {
            key[val.account].amountRiel += math.round(val.result, 2);
          } else if (val.currency == "THB") {
            key[val.account].amountThb += math.round(val.result, 2);
          }
        }
        return key;
      }, {});

      /*
       * Assets
       * */
      data.cashAndBalanceWithNBC = 0;
      data.cashAndBalanceWithNBCOther = 0;
      data.cashAndBalanceWithNBCTotal = 0;

      data.loanAndAdvancedToCustomer = 0;
      data.loanAndAdvancedToCustomerOther = 0;
      data.loanAndAdvancedToCustomerTotal = 0;


      data.landNet = 0;
      data.landNetOther = 0;
      data.landNetTotal = 0;

      data.buildingNet = 0;
      data.buildingNetOther = 0;
      data.buildingNetTotal = 0;

      data.OtherFixAssetNet = 0;
      data.OtherFixAssetNetOther = 0;
      data.OtherFixAssetNetTotal = 0;


      data.cashOnHand = 0;
      data.cashOnHandOther = 0;
      data.cashOnHandTotal = 0;

      data.balanceNBC = 0;
      data.balanceNBCOther = 0;
      data.balanceNBCTotal = 0;

      data.accountBank = 0;
      data.accountBankOther = 0;
      data.accountBankTotal = 0;

      data.interestReceivable = 0;
      data.interestReceivableOther = 0;
      data.interestReceivableTotal = 0;

      data.totalLoanOutStanding = 0;
      data.totalLoanOutStandingOther = 0;
      data.totalLoanOutStandingTotal = 0;

      data.loanLossReverse = 0;
      data.loanLossReverseOther = 0;
      data.loanLossReverseTotal = 0;

      data.interestReceivableNet = 0;
      data.interestReceivableNetOther = 0;
      data.interestReceivableNetTotal = 0;

      data.prePayment = 0;
      data.prePaymentOther = 0;
      data.prePaymentTotal = 0;

      data.longTermInvestments = 0;
      data.longTermInvestmentsOther = 0;
      data.longTermInvestmentsTotal = 0;

      data.land = 0;
      data.landOther = 0;
      data.landTotal = 0;

      data.landAccumulatedDep = 0;
      data.landAccumulatedDepOther = 0;
      data.landAccumulatedDepTotal = 0;

      data.buildingAtCost = 0;
      data.buildingAtCostOther = 0;
      data.buildingAtCostTotal = 0;

      data.propertyAndEquipment = 0;
      data.propertyAndEquipmentOther = 0;
      data.propertyAndEquipmentTotal = 0;

      data.buildingAccumulatedDep = 0;
      data.buildingAccumulatedDepOther = 0;
      data.buildingAccumulatedDepTotal = 0;

      data.otherFixAssetsAtCost = 0;
      data.otherFixAssetsAtCostOther = 0;
      data.otherFixAssetsAtCostTotal = 0;

      data.otherFixedAssetAccumulatedDep = 0;
      data.otherFixedAssetAccumulatedDepOther = 0;
      data.otherFixedAssetAccumulatedDepTotal = 0;


      data.otherAsset = 0;
      data.otherAssetOther = 0;
      data.otherAssetTotal = 0;

      data.totalAsset = 0;
      data.totalAssetOther = 0;
      data.totalAssetTotal = 0;


      /*
       * Liability
       *
       * */

      data.customerDeposit = 0;
      data.customerDepositOther = 0;
      data.customerDepositTotal = 0;

      data.compulsorySaving = 0;
      data.compulsorySavingOther = 0;
      data.compulsorySavingTotal = 0;

      data.voluntarySaving = 0;
      data.voluntarySavingOther = 0;
      data.voluntarySavingTotal = 0;

      data.savingDeposit = 0;
      data.savingDepositOther = 0;
      data.savingDepositTotal = 0;

      data.demandDeposite = 0;
      data.demandDepositeOther = 0;
      data.demandDepositeTotal = 0;

      data.termDeposite = 0;
      data.termDepositeOther = 0;
      data.termDepositeTotal = 0;

      data.otherDeposite = 0;
      data.otherDepositeOther = 0;
      data.otherDepositeTotal = 0;

      data.interestPayable = 0;
      data.interestPayableOther = 0;
      data.interestPayableTotal = 0;

      data.other = 0;
      data.otherOther = 0;
      data.otherTotal = 0;

      data.accountsPayableAndOtherLiabilities = 0;
      data.accountsPayableAndOtherLiabilitiesOther = 0;
      data.accountsPayableAndOtherLiabilitiesTotal = 0;

      data.accruedExpenseAndProvisions = 0;
      data.accruedExpenseAndProvisionsOther = 0;
      data.accruedExpenseAndProvisionsTotal = 0;

      data.loanPayable = 0;
      data.loanPayableOther = 0;
      data.loanPayableTotal = 0;

      data.loanPayableShortTerm = 0;
      data.loanPayableShortTermOther = 0;
      data.loanPayableShortTermTotal = 0;

      data.loanPayableLongTerm = 0;
      data.loanPayableLongTermOther = 0;
      data.loanPayableLongTermTotal = 0;

      data.defferedRevenue = 0;
      data.defferedRevenueOther = 0;
      data.defferedRevenueTotal = 0;

      data.suspenseClearing = 0;
      data.suspenseClearingOther = 0;
      data.suspenseClearingTotal = 0;

      data.otherLiability = 0;
      data.otherLiabilityOther = 0;
      data.otherLiabilityTotal = 0;

      data.totalLiability = 0;
      data.totalLiabilityOther = 0;
      data.totalLiabilityTotal = 0;


      /*
       * Equity
       * */
      data.paidUpCapital = 0;
      data.paidUpCapitalOther = 0;
      data.paidUpCapitalTotal = 0;

      data.premiumOnShareCapital = 0;
      data.premiumOnShareCapitalOther = 0;
      data.premiumOnShareCapitalTotal = 0;

      data.donadedCapital = 0;
      data.donadedCapitalOther = 0;
      data.donadedCapitalTotal = 0;

      data.hybridCapitalInvestment = 0;
      data.hybridCapitalInvestmentOther = 0;
      data.hybridCapitalInvestmentTotal = 0;

      data.reservesAndAppropriations = 0;
      data.reservesAndAppropriationsOther = 0;
      data.reservesAndAppropriationsTotal = 0;

      data.retainedEarning = 0;
      data.retainedEarningOther = 0;
      data.retainedEarningTotal = 0;

      data.netIncome = 0;
      data.netIncomeOther = 0;
      data.netIncomeTotal = 0;

      data.totalEquity = 0;
      data.totalEquityOther = 0;
      data.totalEquityTotal = 0;

      data.totalLiabilitiesAndEquity = 0;
      data.totalLiabilitiesAndEquityOther = 0;
      data.totalLiabilitiesAndEquityTotal = 0;

      var accountCode = "";
      var selectorNbcCode = {};

      result.forEach(function (obj) {

        /*
         * Assets
         * */
        accountCode = obj.code.substr(0, 6);

        selectorNbcCode['transaction.accountDoc.code'] = new RegExp("^" +
            accountCode, "m");
        var nbcCode = MapNBCBalance.findOne(
            selectorNbcCode);

        if (nbcCode != null) {
          if (nbcCode.accountDocNBC.code == "1.1") {
            data.cashOnHand += obj.amountRiel / 1000000;
            data.cashOnHandOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "1.2") {
            data.balanceNBC += obj.amountRiel / 1000000;
            data.balanceNBCOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "1.3") {
            data.accountBank += obj.amountRiel / 1000000;
            data.accountBankOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "1.4") {
            data.interestReceivable += obj.amountRiel / 1000000;
            data.interestReceivableOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "2.1") {
            data.totalLoanOutStanding += obj.amountRiel / 1000000;
            data.totalLoanOutStandingOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "2.2") {
            data.loanLossReverse += obj.amountRiel / 1000000;
            data.loanLossReverseOther += (obj.amountUsd + obj.amountThb) /
                1000000;

          } else if (nbcCode.accountDocNBC.code == "2.3") {
            data.interestReceivableNet += obj.amountRiel / 1000000;
            data.interestReceivableNetOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "3") {
            data.prePayment += obj.amountRiel / 1000000;
            data.prePaymentOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "4") {
            data.longTermInvestments += obj.amountRiel / 1000000;
            data.longTermInvestmentsOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "5.1.1") {
            data.land += obj.amountRiel / 1000000;
            data.landOther += (obj.amountUsd + obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "5.1.2") {
            data.landAccumulatedDep += obj.amountRiel / 1000000;
            data.landAccumulatedDepOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "5.2.1") {
            data.buildingAtCost += obj.amountRiel / 1000000;
            data.buildingAtCostOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "5.2.2") {
            data.buildingAccumulatedDep += obj.amountRiel / 1000000;
            data.buildingAccumulatedDepOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "5.3.1") {
            data.otherFixAssetsAtCost += obj.amountRiel / 1000000;
            data.otherFixAssetsAtCostOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "5.3.2") {
            data.otherFixedAssetAccumulatedDep += obj.amountRiel /
                1000000;
            data.otherFixedAssetAccumulatedDepOther += (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "6") {
            data.otherAsset += obj.amountRiel / 1000000;
            data.otherAssetOther += (obj.amountUsd + obj.amountThb) /
                1000000;
          }

          /*
           * Liability
           * */
          else if (nbcCode.accountDocNBC.code == "7.1") {
            data.compulsorySaving += (-1) * obj.amountRiel / 1000000;
            data.compulsorySavingOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.2.1") {
            data.savingDeposit += (-1) * obj.amountRiel / 1000000;
            data.savingDepositOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.2.2") {
            data.demandDeposite += (-1) * obj.amountRiel / 1000000;
            data.demandDepositeOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.2.3") {
            data.termDeposite += (-1) * obj.amountRiel / 1000000;
            data.termDepositeOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.2.4") {
            data.otherDeposite += (-1) * obj.amountRiel / 1000000;
            data.otherDepositeOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.3") {
            data.interestPayable += (-1) * obj.amountRiel / 1000000;
            data.interestPayableOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "7.4") {
            data.other += (-1) * obj.amountRiel / 1000000;
            data.otherOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "8") {
            data.accountsPayableAndOtherLiabilities += (-1) * obj.amountRiel /
                1000000;
            data.accountsPayableAndOtherLiabilitiesOther += (-1) * (obj
                    .amountUsd + obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "9") {
            data.accruedExpenseAndProvisions += (-1) * obj.amountRiel /
                1000000;
            data.accruedExpenseAndProvisionsOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "10.1") {
            data.loanPayableShortTerm += (-1) * obj.amountRiel /
                1000000;
            data.loanPayableShortTermOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "10.2") {
            data.loanPayableLongTerm += (-1) * obj.amountRiel / 1000000;
            data.loanPayableLongTermOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "11") {
            data.defferedRevenue += (-1) * obj.amountRiel / 1000000;
            data.defferedRevenueOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "12") {
            data.suspenseClearing += (-1) * obj.amountRiel / 1000000;
            data.suspenseClearingOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "13") {
            data.otherLiability += (-1) * obj.amountRiel / 1000000;
            data.otherLiabilityOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          }
          /*
           * Equity
           * */
          else if (nbcCode.accountDocNBC.code == "14.1") {
            data.paidUpCapital += (-1) * obj.amountRiel / 1000000;
            data.paidUpCapitalOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "14.2") {
            data.premiumOnShareCapital += (-1) * obj.amountRiel /
                1000000;
            data.premiumOnShareCapitalOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "14.3") {
            data.donadedCapital += (-1) * obj.amountRiel / 1000000;
            data.donadedCapitalOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          } else if (nbcCode.accountDocNBC.code == "14.4") {
            data.hybridCapitalInvestment += (-1) * obj.amountRiel /
                1000000;
            data.hybridCapitalInvestmentOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "14.5") {
            data.reservesAndAppropriations += (-1) * obj.amountRiel /
                1000000;
            data.reservesAndAppropriationsOther += (-1) * (obj.amountUsd +
                obj.amountThb) / 1000000;
          } else if (nbcCode.accountDocNBC.code == "14.6") {
            data.retainedEarning += (-1) * obj.amountRiel / 1000000;
            data.retainedEarningOther += (-1) * (obj.amountUsd + obj.amountThb) /
                1000000;
          }
        }

      });

      /*
       * Assets
       * */
      data.cashOnHandTotal = math.round(data.cashOnHand, 2) + math.round(
              data.cashOnHandOther, 2);
      data.balanceNBCTotal = math.round(data.balanceNBC, 2) + math.round(
              data.balanceNBCOther, 2);
      data.accountBankTotal = math.round(data.accountBank, 2) + math.round(
              data.accountBankOther, 2);
      data.interestReceivableTotal = math.round(data.interestReceivable, 2) +
          math.round(data.interestPayableOther, 2);
      data.totalLoanOutStandingTotal = math.round(data.totalLoanOutStanding,
              2) + math.round(data.totalLoanOutStandingOther, 2);
      data.loanLossReverseTotal = math.round(data.loanLossReverse, 2) +
          math.round(data.loanLossReverseOther, 2);
      data.interestReceivableNetTotal = math.round(data.interestReceivableNet,
              2) + math.round(data.interestReceivableNetOther, 2);
      data.prePaymentTotal = math.round(data.prePayment, 2) + math.round(
              data.prePaymentOther, 2);
      data.longTermInvestmentsTotal = math.round(data.longTermInvestments,
              2) + math.round(data.longTermInvestmentsOther, 2);
      data.landTotal = math.round(data.land, 2) + math.round(data.landOther,
              2);
      data.landAccumulatedDepTotal = math.round(data.landAccumulatedDep, 2) +
          math.round(data.landAccumulatedDepOther, 2);
      data.buildingAtCostTotal = math.round(data.buildingAtCost, 2) + math.round(
              data.buildingAtCostOther, 2);
      data.buildingAccumulatedDepTotal = math.round(data.buildingAccumulatedDep,
              2) + math.round(data.buildingAccumulatedDepOther, 2);
      data.otherFixAssetsAtCostTotal = math.round(data.otherFixAssetsAtCost,
              2) + math.round(data.otherFixAssetsAtCostOther, 2);
      data.otherFixedAssetAccumulatedDepTotal = math.round(data.otherFixedAssetAccumulatedDep,
              2) + math.round(data.otherFixedAssetAccumulatedDepOther, 2);
      data.otherAssetTotal = math.round(data.otherAsset, 2) + math.round(
              data.otherAssetOther, 2);


      data.cashAndBalanceWithNBC = math.round(math.round(data.cashOnHand, 2) +
          math.round(data.balanceNBC, 2) + math.round(data.accountBank, 2) +
          math.round(data.interestReceivable, 2), 2);
      data.cashAndBalanceWithNBCOther = math.round(math.round(data.cashOnHandOther,
              2) + math.round(data.balanceNBCOther, 2) + math.round(data.accountBankOther,
              2) + math.round(data.interestReceivableOther, 2), 2);
      data.cashAndBalanceWithNBCTotal = math.round(math.round(data.cashOnHandTotal,
              2) + math.round(data.balanceNBCTotal, 2) + math.round(data.accountBankTotal,
              2) + math.round(data.interestReceivableTotal, 2), 2);


      data.loanAndAdvancedToCustomer = math.round(math.round(data.totalLoanOutStanding,
              2) + math.round(data.loanLossReverse, 2) + math.round(data.interestReceivableNet,
              2), 2);
      data.loanAndAdvancedToCustomerOther = math.round(math.round(data.totalLoanOutStandingOther,
              2) + math.round(data.loanLossReverseOther, 2) + math.round(data
              .interestReceivableNetOther, 2), 2);
      data.loanAndAdvancedToCustomerTotal = math.round(math.round(data.totalLoanOutStandingTotal,
              2) + math.round(data.loanLossReverseTotal, 2) + math.round(data
              .interestReceivableNetTotal, 2), 2);


      data.landNet = math.round(math.round(data.land, 2) + math.round(data.landAccumulatedDep),
          2);
      data.landNetOther = math.round(math.round(data.landOther, 2) + math.round(
              data.landAccumulatedDepOther), 2);
      data.landNetTotal = math.round(math.round(data.landTotal, 2) + math.round(
              data.landAccumulatedDepTotal), 2);

      data.buildingNet = math.round(math.round(data.buildingAtCost, 2) +
          math.round(data.buildingAccumulatedDep, 2), 2);
      data.buildingNetOther = math.round(math.round(data.buildingAtCostOther,
              2) + math.round(data.buildingAccumulatedDepOther, 2), 2);
      data.buildingNetTotal = math.round(math.round(data.buildingAtCostTotal,
              2) + math.round(data.buildingAccumulatedDepTotal, 2), 2);

      data.otherFixAssetNet = math.round(math.round(data.otherFixAssetsAtCost,
              2) + math.round(data.otherFixedAssetAccumulatedDep, 2), 2);
      data.otherFixAssetNetOther = math.round(math.round(data.otherFixAssetsAtCostOther,
              2) + math.round(data.otherFixedAssetAccumulatedDepOther, 2), 2);
      data.otherFixAssetNetTotal = math.round(math.round(data.otherFixAssetsAtCostTotal,
              2) + math.round(data.otherFixedAssetAccumulatedDepTotal, 2), 2);

      data.propertyAndEquipment = math.round(math.round(data.landNet, 2) +
          math.round(data.buildingNet, 2) + math.round(data.otherFixAssetNet,
              2), 2);
      data.propertyAndEquipmentOther = math.round(math.round(data.landNetOther,
              2) + math.round(data.buildingNetOther, 2) + math.round(data.otherFixAssetNetOther,
              2), 2);
      data.propertyAndEquipmentTotal = math.round(math.round(data.landNetTotal,
              2) + math.round(data.buildingNetTotal, 2) + math.round(data.otherFixAssetNetTotal,
              2), 2);


      data.totalAsset = math.round(data.cashAndBalanceWithNBC, 2) + math.round(
              data.loanAndAdvancedToCustomer, 2) + math.round(data.prePayment,
              2) + math.round(data.longTermInvestments, 2) + math.round(data.propertyAndEquipment,
              2) + math.round(data.otherAsset, 2);
      data.totalAssetOther = math.round(data.cashAndBalanceWithNBCOther, 2) +
          math.round(data.loanAndAdvancedToCustomerOther, 2) + math.round(
              data.prePaymentOther, 2) + math.round(data.longTermInvestmentsOther,
              2) + math.round(data.propertyAndEquipmentOther, 2) + math.round(
              data.otherAssetOther, 2);
      data.totalAssetTotal = math.round(data.cashAndBalanceWithNBCTotal, 2) +
          math.round(data.loanAndAdvancedToCustomerTotal, 2) + math.round(
              data.prePaymentTotal, 2) + math.round(data.longTermInvestmentsTotal,
              2) + math.round(data.propertyAndEquipmentTotal, 2) + math.round(
              data.otherAssetTotal, 2);
      /*
       * Liability
       * */
      data.compulsorySavingTotal = (math.round(data.compulsorySaving, 2) +
      math.round(data.compulsorySavingOther, 2));
      data.savingDepositTotal = (math.round(data.savingDeposit, 2) + math.round(
          data.savingDepositOther, 2));
      data.demandDepositeTotal = (math.round(data.demandDeposite, 2) + math
          .round(data.demandDepositeOther, 2));
      data.termDepositeTotal = (math.round(data.termDeposite, 2) + math.round(
          data.termDepositeOther, 2));
      data.otherDepositeTotal = (math.round(data.otherDeposite, 2) + math.round(
          data.otherDepositeOther, 2));
      data.interestPayableTotal = (math.round(data.interestPayable, 2) +
      math.round(data.interestPayableOther, 2));
      data.otherTotal = (math.round(data.other, 2) + math.round(data.otherOther,
          2));
      data.accountsPayableAndOtherLiabilitiesTotal = (math.round(data.accountsPayableAndOtherLiabilities,
          2) + math.round(data.accountsPayableAndOtherLiabilitiesOther, 2));
      data.accruedExpenseAndProvisionsTotal = (math.round(data.accruedExpenseAndProvisions,
          2) + math.round(data.accruedExpenseAndProvisionsOther, 2));
      data.loanPayableShortTermTotal = (math.round(data.loanPayableShortTerm,
          2) + math.round(data.loanPayableShortTermOther, 2));
      data.loanPayableLongTermTotal = (math.round(data.loanPayableLongTerm,
          2) + math.round(data.loanPayableLongTermOther, 2));
      data.defferedRevenueTotal = (math.round(data.defferedRevenue, 2) +
      math.round(data.defferedRevenueOther, 2));
      data.suspenseClearingTotal = (math.round(data.suspenseClearing, 2) +
      math.round(data.suspenseClearingOther, 2));
      data.otherLiabilityTotal = (math.round(data.otherLiability, 2) + math
          .round(data.otherLiabilityOther, 2));


      data.voluntarySaving = math.round(data.savingDeposit, 2) + math.round(
              data.demandDeposite, 2) + math.round(data.termDeposite, 2) + math
              .round(data.otherDeposite, 2);
      data.voluntarySavingOther = math.round(data.savingDepositOther, 2) +
          math.round(data.demandDepositeOther, 2) + math.round(data.termDepositeOther,
              2) + math.round(data.otherDepositeOther, 2);
      data.voluntarySavingTotal = math.round(data.savingDepositTotal, 2) +
          math.round(data.demandDepositeTotal, 2) + math.round(data.termDepositeTotal,
              2) + math.round(data.otherDepositeTotal, 2);

      data.customerDeposit = math.round(data.compulsorySaving, 2) + math.round(
              data.voluntarySaving, 2) + math.round(data.interestPayable, 2) +
          math.round(data.other, 2);
      data.customerDepositOther = math.round(data.compulsorySavingOther, 2) +
          math.round(data.voluntarySavingOther, 2) + math.round(data.interestPayableOther,
              2) + math.round(data.otherOther, 2);
      data.customerDepositTotal = math.round(data.compulsorySavingTotal, 2) +
          math.round(data.voluntarySavingTotal, 2) + math.round(data.interestPayableTotal,
              2) + math.round(data.otherTotal, 2);

      data.loanPayable = math.round(data.loanPayableLongTerm, 2) + math.round(
              data.loanPayableShortTerm, 2);
      data.loanPayableOther = math.round(data.loanPayableLongTermOther, 2) +
          math.round(data.loanPayableShortTermOther, 2);
      data.loanPayableTotal = math.round(data.loanPayableLongTermTotal, 2) +
          math.round(data.loanPayableShortTermTotal, 2);

      data.totalLiability = math.round(data.customerDeposit, 2) + math.round(
              data.accountsPayableAndOtherLiabilities, 2) + math.round(data.accruedExpenseAndProvisions,
              2) + math.round(data.loanPayable, 2) + math.round(data.defferedRevenue,
              2) + math.round(data.suspenseClearing, 2) + math.round(data.otherLiability,
              2);
      data.totalLiabilityOther = math.round(data.customerDepositOther, 2) +
          math.round(data.accountsPayableAndOtherLiabilitiesOther, 2) + math.round(
              data.accruedExpenseAndProvisionsOther, 2) + math.round(data.loanPayableOther,
              2) + math.round(data.defferedRevenueOther, 2) + math.round(data.suspenseClearingOther,
              2) + math.round(data.otherLiabilityOther, 2);
      data.totalLiabilityTotal = math.round(data.customerDepositTotal, 2) +
          math.round(data.accountsPayableAndOtherLiabilitiesTotal, 2) + math.round(
              data.accruedExpenseAndProvisionsTotal, 2) + math.round(data.loanPayableTotal,
              2) + math.round(data.defferedRevenueTotal, 2) + math.round(data.suspenseClearingTotal,
              2) + math.round(data.otherLiabilityTotal, 2);


      /*
       * Equity
       * */
      data.paidUpCapitalTotal = (math.round(data.paidUpCapital, 2) + math.round(
          data.paidUpCapitalOther, 2));
      data.premiumOnShareCapitalTotal = (math.round(data.premiumOnShareCapital,
          2) + math.round(data.premiumOnShareCapitalOther, 2));
      data.donadedCapitalTotal = (math.round(data.donadedCapital, 2) + math
          .round(data.donadedCapitalOther, 2));
      data.hybridCapitalInvestmentTotal = (math.round(data.hybridCapitalInvestment,
          2) + math.round(data.hybridCapitalInvestmentOther, 2));
      data.reservesAndAppropriationsTotal = (math.round(data.reservesAndAppropriations,
          2) + math.round(data.reservesAndAppropriationsOther, 2));
      data.retainedEarningTotal = (math.round(data.retainedEarning, 2) +
      math.round(data.retainedEarningOther, 2));


      data.netIncomeOther = math.round((contentProfit.profitUSD +
          contentProfit.profitB) / 1000000, 2);
      data.netIncome = math.round(contentProfit.profitR / 1000000, 2);
      data.netIncomeTotal = math.round(contentProfit.profit / 1000000, 2);


      data.totalEquity = math.round(data.paidUpCapital, 2) + math.round(
              data.premiumOnShareCapital, 2) + math.round(data.donadedCapital,
              2) + math.round(data.hybridCapitalInvestment, 2) + math.round(
              data.reservesAndAppropriations, 2) + math.round(data.retainedEarning,
              2) + math.round(data.netIncome, 2);
      data.totalEquityOther = math.round(data.paidUpCapitalOther, 2) + math
              .round(data.premiumOnShareCapitalOther, 2) + math.round(data.donadedCapitalOther,
              2) + math.round(data.hybridCapitalInvestmentOther, 2) + math.round(
              data.reservesAndAppropriationsOther, 2) + math.round(data.retainedEarningOther,
              2) + math.round(data.netIncomeOther, 2);
      data.totalEquityTotal = math.round(data.paidUpCapitalTotal, 2) + math
              .round(data.premiumOnShareCapitalTotal, 2) + math.round(data.donadedCapitalTotal,
              2) + math.round(data.hybridCapitalInvestmentTotal, 2) + math.round(
              data.reservesAndAppropriationsTotal, 2) + math.round(data.retainedEarningTotal,
              2) + math.round(data.netIncomeTotal, 2);


      data.totalLiabilitiesAndEquity = math.round(data.totalLiability, 2) +
          math.round(data.totalEquity, 2);
      data.totalLiabilitiesAndEquityOther = math.round(data.totalLiabilityOther,
              2) + math.round(data.totalEquityOther, 2);
      data.totalLiabilitiesAndEquityTotal = math.round(data.totalLiabilityTotal,
              2) + math.round(data.totalEquityTotal, 2);

      var compare = math.round(data.totalAssetTotal, 2) - math.round(data.totalLiabilitiesAndEquityTotal, 2);
      if (math.abs(compare) < 0.05) {
        data.totalLiabilitiesAndEquityTotal = data.totalAssetTotal;
        data.totalLiabilitiesAndEquityOther = data.totalLiabilitiesAndEquityOther + compare;

        data.totalEquityOther = data.totalEquityOther + compare;
        data.totalEquityTotal = data.totalEquityTotal + compare;

        data.hybridCapitalInvestmentTotal = data.hybridCapitalInvestmentTotal + compare;
        data.hybridCapitalInvestmentOther = data.hybridCapitalInvestmentOther + compare;
      }
      return data;
    }
  }
});
