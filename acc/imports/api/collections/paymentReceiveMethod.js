
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

import {SelectOpts} from '../../ui/libs/select-opts';
/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const PaymentReceiveMethod = new Mongo.Collection("accPaymentReceiveMethod");
/**
 * Schema
 *
 * @type {AccSchema}
 */
PaymentReceiveMethod.schema = new SimpleSchema({
  chartAccount: {
    type: String,
    optional: true,
    label: "Chart Account",
    autoform: {
      type: "select2",
      options: function() {
        return SelectOpts.chartAccountId();
      }
    }
  },
  chartAccountCompare: {
    type: String,
    label: "Payment/Receive Name"
  },
  accountDoc:{
    type: Object,
    optional: true
  }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
  PaymentReceiveMethod.schema.i18n("acc.paymentReceiveMethod.schema");
  PaymentReceiveMethod.attachSchema(PaymentReceiveMethod.schema);
});
