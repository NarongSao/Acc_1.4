import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';
import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';

Meteor.methods({
  getTrialBalance: function(selector, baseCurrency, exchangeDate,
    selectorGetLastBalance, lastDate) {
    var arr = [];
    var results = Journal.aggregate([{
        $unwind: "$transaction"
      }, {
        $match: selector
      }, {
        $group: {
          _id: {
            account: "$transaction.accountDoc._id",
            code: "$transaction.accountDoc.code",
            name: "$transaction.accountDoc.name",
            currency: "$currencyId"
          },
          result: {
            $sum: "$transaction.drcr"
          }
        }
      },

      {
        $sort: {
          "_id.code": 1
        }
      }
    ]);

    results.forEach(function(obj) {
      var re = Meteor.call('exchange', obj._id.currency, baseCurrency,
        obj.result, exchangeDate);
      arr.push({
        account: obj._id.account,
        name: obj._id.name,
        result: math.round(re, 2),
        code: obj._id.code
      });
    });

    if (lastDate != null) {
      var resultLast = CloseChartAccount.find(
        selectorGetLastBalance);
      if (resultLast != null) {
        resultLast.forEach(function(lastBal) {
          var re = Meteor.call('exchange', lastBal.currencyId,
            baseCurrency, lastBal.value, exchangeDate);
          arr.push({
            account: lastBal.closeChartAccountId,
            name: lastBal.name,
            result: math.round(re, 2),
            code: lastBal.code
          });
        })
      }
    }

    arr.sort(compare);
    return arr;
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
};
