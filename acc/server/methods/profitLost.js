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
    getProfitLost: function (selector, baseCurrency, exchangeDate,showNonActive) {
        var arr = [];
        var result = Journal.aggregate([

            {
                $unwind: "$transaction"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        account: "$transaction.accountDoc._id",
                        name: "$transaction.accountDoc.name",
                        currency: "$currencyId",
                        accountType: "$transaction.accountDoc.accountTypeId",
                        code: "$transaction.accountDoc.code",
                        level: "$transaction.accountDoc.level",
                        parent: "$transaction.accountDoc.parentId"
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

        result.forEach(function (obj) {
            if (obj.result != 0) {
                var re = Meteor.call('exchange', obj._id.currency,
                    baseCurrency, obj.result, exchangeDate);
                arr.push({
                    account: obj._id.account,
                    name: obj._id.name,
                    result: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * re : re,
                    value: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * obj.result : obj.result,
                    accountType: obj._id.accountType,
                    code: obj._id.code,
                    currency: obj._id.currency,
                    level: obj._id.level,
                    parent: obj._id.parent
                });
            }
        });
        return arr;
    },
    getProfitLostNBC: function (selector, baseCurrency, exchangeDate) {
        var arr = [];
        var result = Journal.aggregate([

            {
                $unwind: "$transaction"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        account: "$transaction.accountDoc._id",
                        name: "$transaction.accountDoc.name",
                        currency: "$currencyId",
                        accountType: "$transaction.accountDoc.accountTypeId",
                        code: "$transaction.accountDoc.code"
                    },
                    result: {
                        $sum: "$transaction.drcr"
                    }
                }
            }
        ]);

        result.forEach(function (obj) {
            if (obj.result != 0) {
                var re = Meteor.call('exchangeNBC', obj._id.currency,
                    baseCurrency, obj.result, exchangeDate);
                arr.push({
                    account: obj._id.account,
                    name: obj._id.name,
                    result: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * re : re,
                    accountType: obj._id.accountType,
                    code: obj._id.code,
                    currency: obj._id.currency
                });
            }
        });
        return arr;
    },
    getProfitLostYearToDate: function (selector, baseCurrency, exchangeDate,
                                       selectorMiddle, selectorEndDate,showNonActive) {
        var arr = [];
        var result = Journal.aggregate([

            {
                $unwind: "$transaction"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        account: "$transaction.accountDoc._id",
                        name: "$transaction.accountDoc.name",
                        currency: "$currencyId",
                        accountType: "$transaction.accountDoc.accountTypeId",
                        code: "$transaction.accountDoc.code",
                        level: "$transaction.accountDoc.level",
                        parent: "$transaction.accountDoc.parentId"
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

        result.forEach(function (obj) {
            if (obj.result != 0) {
                // exchangeDate == exchangeDateID
                var re = Meteor.call('exchange', obj._id.currency,
                    baseCurrency, obj.result, exchangeDate);
                arr.push({
                    account: obj._id.account,
                    name: obj._id.name,
                    result: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * re : re,
                    value: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * obj.result : obj.result,
                    accountType: obj._id.accountType,
                    code: obj._id.code,
                    currency: obj._id.currency,
                    thisMonth: true,
                    level: obj._id.level,
                    parent: obj._id.parent
                });
            }
        });


        if(showNonActive=='true' || showNonActive== true){
            var accountParent=ChartAccount.find({accountTypeId : {$in : ['40','41','50','51']},level: {$gt: 0}}).fetch().map(function (obj) {
                return obj.parentId;
            });
            ChartAccount.find({accountTypeId : {$in : ['40','41','50','51']},_id : {$nin: accountParent}}).fetch().forEach(function (obj) {
                arr.push({
                    account: obj._id,
                    name: obj.name,
                    result: 0,
                    value: 0,
                    accountType: obj.accountTypeId,
                    code: obj.code,
                    currency: baseCurrency,
                    thisMonth: true,
                    level: obj.level,
                    parent: obj.parentId
                });
            })
        }

        // ResultMiddle
        if (selectorMiddle != "") {
            var resultMiddle = Journal.aggregate([

                {
                    $unwind: "$transaction"
                }, {
                    $match: selectorMiddle
                }, {
                    $group: {
                        _id: {
                            account: "$transaction.accountDoc._id",
                            name: "$transaction.accountDoc.name",
                            currency: "$currencyId",
                            accountType: "$transaction.accountDoc.accountTypeId",
                            code: "$transaction.accountDoc.code",
                            level: "$transaction.accountDoc.level",
                            parent: "$transaction.accountDoc.parentId"
                        },
                        result: {
                            $sum: "$transaction.drcr"
                        }
                    }
                }
            ]);

            resultMiddle.forEach(function (obj) {
                if (obj.result != 0) {
                    var re = Meteor.call('exchange', obj._id.currency,
                        baseCurrency, obj.result, exchangeDate);
                    arr.push({
                        account: obj._id.account,
                        name: obj._id.name,
                        result: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * re : re,
                        value: ["20", "21", "30", "40", "41"].indexOf(obj._id.accountType) != -1 ? (-1) * obj.result : obj.result,
                        accountType: obj._id.accountType,
                        code: obj._id.code,
                        currency: obj._id.currency,
                        thisMonth: false,
                        level: obj._id.level,
                        parent: obj._id.parent
                    });
                }
            });
        }

        // Get from CLose Chart Account

        if (Object.keys(selectorEndDate).length !== 0) {
            var resultEnd = CloseChartAccount.find(
                selectorEndDate).fetch();
            resultEnd.forEach(function (obj) {
                if (obj.value != 0) {
                    var re = Meteor.call('exchange', obj.currencyId,
                        baseCurrency, obj.value, exchangeDate);
                    arr.push({
                        account: obj.closeChartAccountId,
                        name: obj.name,
                        result: ["20", "21", "30", "40", "41"].indexOf(obj.accountTypeId) != -1 ? (-1) * re : re,
                        value: ["20", "21", "30", "40", "41"].indexOf(obj.accountTypeId) != -1 ? (-1) * obj.result : obj.result,
                        accountType: obj.accountTypeId,
                        code: obj.code,
                        currency: obj.currencyId,
                        thisMonth: false,
                        level: obj.level,
                        parent: obj.parentId
                    })
                }
            })

        }
        return arr;
    }

})



