import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Exchange} from '../../../core/imports/api/collections/exchange';
import {ExchangeNBC} from '../../imports/api/collections/exchangeNBC';

Meteor.methods({
  exchange: function(curFrom, curTo, amount, id) {
    var ex = Exchange.findOne({
      base: curTo,
      _id: id
    }, {
      sort: {
        _id: -1
      }
    });
    if (curFrom != curTo) {
      return amount / ex.rates[curFrom];
    } else {
      return amount;
    }
  },
  exchangeNBC: function(curFrom, curTo, amount, id) {
    var ex = ExchangeNBC.findOne({
      base: curTo,
      _id: id
    }, {
      sort: {
        _id: -1
      }
    });

    if (curFrom != curTo) {
      var val = ex.rates[curFrom].split('/');
      if (val[1] != null) {
        return amount * parseFloat(val[1]);
      } else {
        return amount / parseFloat(ex.rates[curFrom]);
      }
    } else {
      return amount;
    }
  }
})
