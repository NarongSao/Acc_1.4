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

Meteor.methods({
  acc_trialBalanceReport: function(params) {
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
      //Parameter for Trial Balance
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

      var result = [];
      var grandTotalDr = 0;
      var grandTotalCr = 0;
      var i = 1;

      var content = Meteor.call("getTrialBalance", selector, baseCurrency,
          exchangeDate, selectorGetLastBalance, lastDate);
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
          key[val.account].result += math.round(val.result, 2);
        }
        return key;
      }, {});


      result.map(function (o) {
        if (o.result > 0) {
          grandTotalDr += math.round(o.result, 2);
        } else {
          grandTotalCr += math.round(o.result, 2);
        }
      });
      data.grandTotalDr = grandTotalDr;
      data.grandTotalCr = -1 * grandTotalCr;

      if (math.abs(data.grandTotalDr - data.grandTotalCr) < 0.05 &&
          baseCurrency == "USD") {
        data.grandTotalDr = data.grandTotalCr;
      } else if (math.abs(data.grandTotalDr - data.grandTotalCr) < 500 &&
          baseCurrency == "KHR") {
        data.grandTotalDr = data.grandTotalCr;
      }
      data.currencySelect = baseCurrency;

      if (result.length > 0) {
        data.result = result;
      }
      return data;
    }
  }
});
