import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {DepExpList} from '../../imports/api/collections/depExpList.js';

// Customer
var module = 'Acc';

DepExpList.before.insert(function (userId, doc) {

    var date = moment(doc.date,"DD/MM/YYYY").format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(DepExpList, prefix, 6);

});

