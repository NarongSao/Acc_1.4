

import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const FixAssetDep = new Mongo.Collection("accFixAssetDep");
/**
 * Schema
 *
 * @type {AccSchema}
 */
FixAssetDep.schema = new SimpleSchema({

  date: {
    type: Date,
    label: "Date",
    defaultValue: function () {
      var currentDate = moment(new Date()).format('YYYY-MM-DD');
      return currentDate;
    }
  },
  branchId: {
    type: String,
    label: "Branch"
  },
  currencyId: {
    type: String,
    label: "Currency"
  },transactionAsset: {
    type: [Object]
  },
  'transactionAsset.$': {
    type: Object
  },
  'transactionAsset.$.account': {
    type: String,
    label: "Account"
  },
  'transactionAsset.$.value': {
    type: Number,
    decimal: true,
    blackbox: true
  },'transactionAsset.$.life': {
    type: Number
  },
  'transactionAsset.$.estSalvage': {
    type: Number,
    optional: true,
    blackbox: true
  },
  'transactionAsset.$.percent': {
    type: Number,
    decimal: true,
    optional: true
  },
  'transactionAsset.$.code': {
    type: String,
    optional: true,
    blackbox: true
  },

  'transactionAsset.$.description': {
    type: String,
    optional: true
  },
  journalId:{
    type: String
  }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
  FixAssetDep.schema.i18n("acc.fixAssetDep.schema");
  FixAssetDep.attachSchema(FixAssetDep.schema);
});
