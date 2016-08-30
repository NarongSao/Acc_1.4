import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {ChartAccount} from '../../imports/api/collections/chartAccount';
import {MapClosing} from '../../imports/api/collections/mapCLosing';

// Customer
var module = 'Acc';

MapClosing.before.update(function(userId, doc, fieldNames,modifier, options) {
  modifier.$set = modifier.$set || {};

  var accountDoc = ChartAccount.findOne({
    _id: modifier.$set.chartAccount
  });
  modifier.$set.accountDoc = accountDoc;
});
