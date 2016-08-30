import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';
import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';
import {NetInCome} from '../../imports/api/collections/netIncome';


Meteor.methods({
    getEndOfProcess: function (selector, branchId, selectorGetLastBalance, lastDate, dateSelect,endId) {

        var data = [];
        var dataUse = [];
        var result = Journal.aggregate([
            {$unwind: "$transaction"},
            {$match: selector},
            {
                $group: {
                    _id: {
                        account: "$transaction.accountDoc._id",
                        code: "$transaction.accountDoc.code",
                        name: "$transaction.accountDoc.name",
                        accountTypeId: "$transaction.accountDoc.accountTypeId",
                        currency: "$currencyId",
                        level: "$transaction.accountDoc.level",
                        parent: "$transaction.accountDoc.parentId",
                    },
                    result: {$sum: "$transaction.drcr"}
                }
            },

            {$sort: {"_id.code": 1}}
        ]);
        var curMonth = moment(dateSelect).format("MM");

        result.forEach(function (obj) {
            data.push({
                closeChartAccountId: obj._id.account,
                code: obj._id.code,
                name: obj._id.name,
                value: obj.result,
                closeDate: dateSelect,
                currencyId: obj._id.currency,
                branchId: branchId,
                accountTypeId: obj._id.accountTypeId,
                level: obj._id.level,
                parentId: obj._id.parent
            })
        });

        if (lastDate !== null) {
            if (curMonth == "12") {
                selectorGetLastBalance.accountTypeId = {
                    $gte: "01",
                    $lte: "39"
                };
                var resultLast = CloseChartAccount.find(selectorGetLastBalance);
            } else {
                var resultLast = CloseChartAccount.find(selectorGetLastBalance);
            }

            if (resultLast != null) {
                resultLast.forEach(function (lastBal) {
                    data.push({
                        closeChartAccountId: lastBal.closeChartAccountId,
                        code: lastBal.code,
                        name: lastBal.name,
                        value: lastBal.value,
                        closeDate: dateSelect,
                        currencyId: lastBal.currencyId,
                        branchId: lastBal.branchId,
                        accountTypeId: lastBal.accountTypeId,
                        level: lastBal.level,
                        parentId: lastBal.parentId
                    })
                })
            }
        }


        data.reduce(function (key, val) {
            if (!key[val.closeChartAccountId + val.currencyId]) {
                key[val.closeChartAccountId + val.currencyId] = {
                    closeChartAccountId: val.closeChartAccountId,
                    code: val.code,
                    name: val.name,
                    value: val.value,
                    closeDate: val.closeDate,
                    currencyId: val.currencyId,
                    branchId: val.branchId,
                    accountTypeId: val.accountTypeId,
                    level: val.level,
                    parentId: val.parentId
                };
                dataUse.push(key[val.closeChartAccountId + val.currencyId]);
            } else {
                key[val.closeChartAccountId + val.currencyId].value += val.value;
            }
            return key;
        }, {});
        dataUse.forEach(function (ob) {
            CloseChartAccount.insert({
                closeChartAccountId: ob.closeChartAccountId,
                code: ob.code,
                name: ob.name,
                value: ob.value,
                closeDate: moment(ob.closeDate,"DD/MM/YYYY").toDate(),
                currencyId: ob.currencyId,
                branchId: ob.branchId,
                accountTypeId: ob.accountTypeId,
                level: ob.level,
                parentId: ob.parentId,
                endId: endId,
                year: moment(ob.closeDate,"DD/MM/YYYY").format("YYYY"),
                month: moment(ob.closeDate,"DD/MM/YYYY").format("MM")
            })
        });


        return "Success";
    },
    removeEndOfProcess: function (id) {
        var data = DateEndOfProcess.findOne({_id: id});
       CloseChartAccount.remove({endId: id}, function (error) {
            if (!error) {
                NetInCome.remove({endId: id});
                if (moment(data.closeDate).format("MM") == 12) {
                    Journal.remove({endId: id});
                }
                DateEndOfProcess.remove(id);
            }
        });

    }
})
