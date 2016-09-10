import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';
import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';
import {ChartAccount} from '../../imports/api/collections/chartAccount';

Meteor.methods({
    getBalanceSheet: function (selector, baseCurrency, exchangeDate,
                               selectorGetLastBalance, lastDate,showNonActive) {
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
                    accountTypeId: "$transaction.accountDoc.accountTypeId",
                    level: "$transaction.accountDoc.level",
                    parent: "$transaction.accountDoc.parentId",
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
        results.forEach(function (obj) {
            if (obj.result = 0) {
                var re = Meteor.call('exchange', obj._id.currency, baseCurrency,
                    obj.result, exchangeDate);
                arr.push({
                    account: obj._id.account,
                    name: obj._id.name,
                    result: re,
                    value: obj.result,
                    code: obj._id.code,
                    accountTypeId: obj._id.accountTypeId,
                    level: obj._id.level,
                    parent: obj._id.parent,
                    currency: obj._id.currency
                });
            }
        });


        if(showNonActive=='true' || showNonActive== true){
            var accountParent=ChartAccount.find({accountTypeId : {$nin : ['40','41','50','51']},level: {$gt: 0}}).fetch().map(function (obj) {
                return obj.parentId;
            });
            ChartAccount.find({accountTypeId : {$nin : ['40','41','50','51']},_id : {$nin: accountParent}}).fetch().forEach(function (obj) {
                arr.push({
                    account: obj._id,
                    name: obj.name,
                    result: 0,
                    value: 0,
                    accountTypeId: obj.accountTypeId,
                    code: obj.code,
                    currency: baseCurrency,
                    level: obj.level,
                    parent: obj.parentId
                });
            })
        }


        if (lastDate != null) {
            var resultLast = CloseChartAccount.find(
                selectorGetLastBalance);
            if (resultLast != null) {
                resultLast.forEach(function (lastBal) {
                    if (lastBal.value != 0) {
                        var re = Meteor.call('exchange', lastBal.currencyId,
                            baseCurrency, lastBal.value, exchangeDate);
                        arr.push({
                            account: lastBal.closeChartAccountId,
                            name: lastBal.name,
                            result: re,
                            value: lastBal.value,
                            code: lastBal.code,
                            accountTypeId: lastBal.accountTypeId,
                            level: lastBal.level,
                            parent: lastBal.parentId,
                            currency: lastBal.currencyId
                        });
                    }
                })

            }
        }

        arr.sort(compare);
        return arr;
    },
    getBalanceSheetNBC: function (selector, baseCurrency, exchangeDate,
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
                    accountTypeId: "$transaction.accountDoc.accountTypeId",
                    level: "$transaction.accountDoc.level",
                    parent: "$transaction.accountDoc.parentId",
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
        results.forEach(function (obj) {
            if (obj.result != 0) {
                var re = Meteor.call('exchangeNBC', obj._id.currency,
                    baseCurrency, obj.result, exchangeDate);
                arr.push({
                    account: obj._id.account,
                    name: obj._id.name,
                    result: re,
                    code: obj._id.code,
                    accountTypeId: obj._id.accountTypeId,
                    level: obj._id.level,
                    parent: obj._id.parent,
                    currency: obj._id.currency
                });
            }
        });


        if (lastDate != null) {
            var resultLast = CloseChartAccount.find(
                selectorGetLastBalance);
            if (resultLast != null) {
                resultLast.forEach(function (lastBal) {
                    if (lastBal.value != 0) {
                        var re = Meteor.call('exchangeNBC', lastBal.currencyId,
                            baseCurrency, lastBal.value, exchangeDate);


                        arr.push({
                            account: lastBal.closeChartAccountId,
                            name: lastBal.name,
                            result: re,
                            code: lastBal.code,
                            accountTypeId: lastBal.accountTypeId,
                            level: lastBal.level,
                            parent: lastBal.parentId,
                            currency: lastBal.currencyId
                        });
                    }
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
}
