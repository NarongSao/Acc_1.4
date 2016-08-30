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
export const MapFixAsset = new Mongo.Collection("accMapFixAsset");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapFixAsset.schema = new SimpleSchema({
    fixAsset: {
        type: String,
        optional: true,
        label: "Chart Account Asset",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.fixAssetList();
            }
        }
    },
    fixAssetCon: {
        type: String,
        optional: true
    },
    accuFixAsset: {
        type: String,
        label: "Accumulated",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.fixAssetList();
            }
        }
    },
    fixAssetExpense: {
        type: String,
        optional: true,
        label: "Asset Expense",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.fixAssetExpenseList();
            }
        }
    },
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    MapFixAsset.schema.i18n("acc.mapFixAsset.schema");
    MapFixAsset.attachSchema(MapFixAsset.schema);
});

