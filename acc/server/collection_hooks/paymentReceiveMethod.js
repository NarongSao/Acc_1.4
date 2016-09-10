import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {ChartAccount} from '../../imports/api/collections/chartAccount';
import {PaymentReceiveMethod} from '../../imports/api/collections/paymentReceiveMethod';

// Customer
var module = 'Acc';

PaymentReceiveMethod.before.insert(function(userId, doc) {
  var accountDoc = ChartAccount.findOne({
    _id: doc.chartAccount
  });
  doc.accountDoc = accountDoc;
});

PaymentReceiveMethod.before.update(function(userId, doc, fieldNames,modifier, options) {
  modifier.$set = modifier.$set || {};

  var accountDoc = ChartAccount.findOne({
    _id: modifier.$set.chartAccount
  });
  modifier.$set.accountDoc = accountDoc;
});
