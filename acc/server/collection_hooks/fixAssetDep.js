
import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {FixAssetDep} from '../../imports/api/collections/fixAssetDep';
// Customer
var module = 'Acc';

FixAssetDep.before.insert(function (userId, doc) {

    var date = moment(doc.date,"DD/MM/YYYY").format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(FixAssetDep, prefix, 6);

});

