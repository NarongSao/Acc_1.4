import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const Closing = new Mongo.Collection("accClosing");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Closing.schema = new SimpleSchema({

  dateFrom: {
    type: Date,
    label: "Close Date From"
  },dateTo: {
    type: Date,
    label: "Close Date To"
  },
  branchId: {
    type: String,
    label: "Branch"
  }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
  Closing.schema.i18n("acc.closing.schema");
  Closing.attachSchema(Closing.schema);
});
