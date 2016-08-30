import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {MapNBCBalance} from '../../imports/api/collections/mapNBCBalance.js';
import {ChartAccount} from '../../imports/api/collections/chartAccount';
import {ChartAccountNBC} from '../../imports/api/collections/chartAccountNBC';

// Customer
var module = 'Acc';

MapNBCBalance.before.insert(function (userId, doc) {

    var transaction = [];
    _.each(doc.transaction, function (obj) {
        if (!_.isNull(obj)) {
            var accountId = obj.account.split('|');
            var account = ChartAccount.findOne({code: accountId[0].replace(/\s+/g, '')}, {
                fields: {
                    name: 1,
                    accountTypeId: 1,
                    code: 1,
                    level: 1,
                    parentId: 1
                }
            });
            obj.accountDoc = account;
            transaction.push(obj);
        }
    });
    doc.transaction = transaction;

    var accountNBC = ChartAccountNBC.findOne({_id: doc.chartAccountNBCId});
    doc.accountDocNBC = accountNBC;


});
MapNBCBalance.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set = modifier.$set || {};
    var transaction = [];
    _.each(modifier.$set.transaction, function (obj) {
        if (!_.isNull(obj)) {
            var accountId = obj.account.split('|');

            var account = ChartAccount.findOne({code: accountId[0].replace(/\s+/g, '')}, {
                fields: {
                    name: 1,
                    accountTypeId: 1,
                    code: 1,
                    level: 1,
                    parentId: 1
                }
            });
            obj.accountDoc = account;
            transaction.push(obj);
        }
    });
    modifier.$set.transaction = transaction;
    var accountNBC = ChartAccountNBC.findOne({_id: modifier.$set.chartAccountNBCId});
    modifier.$set.accountDocNBC = accountNBC;

});
