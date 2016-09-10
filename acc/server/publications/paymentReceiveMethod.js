
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {PaymentReceiveMethod} from '../../imports/api/collections/paymentReceiveMethod';


Meteor.publish('acc.paymentReceiveMethod', function() {
  if (this.userId) {
    this.unblock();
    return PaymentReceiveMethod.find();
  }
});
