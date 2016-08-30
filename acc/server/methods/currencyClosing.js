import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';

Meteor.methods({
    getCurrencyClosing: function (selector, baseCurrency, exchangeDate) {
        var arr = [];
        var results = Journal.aggregate([
            {$unwind: "$transaction"},
            {$match: selector},
            {
                $group: {
                    _id: {
                        account: "$transaction.accountDoc._id",
                        code: "$transaction.accountDoc.code",
                        name: "$transaction.accountDoc.name",
                        currency: "$currencyId"
                    },
                    result: {$sum: "$transaction.drcr"}
                }
            },

            {$sort: {"_id.code": 1}}
        ]);

        results.forEach(function (obj) {
            var re = Meteor.call('exchange',obj._id.currency, baseCurrency, obj.result, exchangeDate);
            arr.push({account: obj._id.account, name: obj._id.name, result: re, code: obj._id.code});
        });
        return arr;
    }

})