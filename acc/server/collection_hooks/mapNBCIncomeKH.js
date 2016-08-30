

import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {MapNBCIncomeKH} from '../../imports/api/collections/mapNBCIncomeKH.js';
import {ChartAccount} from '../../imports/api/collections/chartAccount';
import {ChartAccountNBCKH} from '../../imports/api/collections/chartAccountNBCKH';



// Customer
var module = 'Acc';

MapNBCIncomeKH.before.insert(function (userId, doc) {

        var transaction = [];
        _.each(doc.transaction, function (obj) {
            if (!_.isNull(obj)) {
                var accountId= obj.account.split('|');
                var account= ChartAccount.findOne({code: accountId[0].replace(/\s+/g, '')},{fields:{name: 1,accountTypeId:1,code:1,level:1,parentId: 1}});
                obj.accountDoc = account;
                transaction.push(obj);
            }
        });
        doc.transaction = transaction;

    var accountNBC=ChartAccountNBCKH.findOne({_id: doc.chartAccountNBCId});

    doc.accountDocNBC=accountNBC;

});
MapNBCIncomeKH.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};
        var transaction = [];
        _.each(modifier.$set.transaction, function (obj) {
            if (!_.isNull(obj)) {
                var accountId= obj.account.split('|');

                var account= ChartAccount.findOne({code: accountId[0].replace(/\s+/g, '')},{fields:{name: 1,accountTypeId:1,code:1,level:1,parentId: 1}});
                obj.accountDoc = account;
                transaction.push(obj);
            }
        });
    modifier.$set.transaction = transaction;
    var accountNBC=ChartAccountNBCKH.findOne({_id: modifier.$set.chartAccountNBCId});
    modifier.$set.accountDocNBC=accountNBC;


});
