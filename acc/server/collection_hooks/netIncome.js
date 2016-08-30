import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {NetInCome} from '../../imports/api/collections/netIncome';

// Customer
var module = 'Acc';

NetInCome.before.insert(function (userId, doc) {
    var date = moment(doc.date,"DD/MM/YYYY").format("YYMM");
    var prefix = doc.branchId + "-" + date;
    doc._id = idGenerator.genWithPrefix(NetInCome, prefix, 6);

});

