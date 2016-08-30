
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
export const MapClosing = new Mongo.Collection("accMapClosing");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapClosing.schema = new SimpleSchema({
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
    label: "Compare Account"
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
  MapClosing.schema.i18n("acc.mapClosing.schema");
  MapClosing.attachSchema(MapClosing.schema);
});
