import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {MapFixAsset} from '../../imports/api/collections/mapFixAsset.js';
import {ChartAccount} from '../../imports/api/collections/chartAccount';

// Customer
var module = 'Acc';


MapFixAsset.before.insert(function (userId, doc) {

    var fixAssetDoc = ChartAccount.findOne({_id: doc.fixAsset});
    doc.fixAssetDoc = fixAssetDoc;

    doc.fixAssetCon=fixAssetDoc.code+ " | "+ fixAssetDoc.name;

    var accuFixAssetDoc = ChartAccount.findOne({_id: doc.accuFixAsset});
    doc.accuFixAssetDoc = accuFixAssetDoc;

    var fixAssetExpenseDoc = ChartAccount.findOne({_id: doc.fixAssetExpense});
    doc.fixAssetExpenseDoc = fixAssetExpenseDoc;


});


MapFixAsset.before.update(function (userId, doc, fieldNames,
                                                   modifier, options) {
    var fixAssetDoc = ChartAccount.findOne({_id: doc.fixAsset});
    modifier.$set.fixAssetDoc = fixAssetDoc;

    modifier.$set.fixAssetCon=fixAssetDoc.code+ " | "+ fixAssetDoc.name;

    var accuFixAssetDoc = ChartAccount.findOne({_id: doc.accuFixAsset});
    modifier.$set.accuFixAssetDoc = accuFixAssetDoc;

    var fixAssetExpenseDoc = ChartAccount.findOne({_id: doc.fixAssetExpense});
    modifier.$set.fixAssetExpenseDoc = fixAssetExpenseDoc;

});
