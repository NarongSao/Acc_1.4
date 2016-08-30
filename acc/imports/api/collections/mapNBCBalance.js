import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';
import {SelectOpts} from '../../ui/libs/select-opts';
/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const MapNBCBalance = new Mongo.Collection('accMapNBCBalance');

/**
 * Schema
 *
 * @type {AccSchema}
 */
MapNBCBalance.schema = new SimpleSchema({

    chartAccountNBCId: {
        type: String,
        label: "NBC Account",
        autoform: {
            type: "select2",
            options: function () {
                var selector = {};
                selector.accountTypeNBC = "Balance";
                return SelectOpts.chartAccountNBC({accountTypeNBC: "Balance"});
            }
        }
    },
    transaction: {
        type: Array,
        optional: true
    },
    'transaction.$': {
        type: Object
    },
    'transaction.$.account': {
        type: String,
        max: 200,
        label: "Account"
    }
});
/**
 * Attach schema
 */

export const chartAccountDetail = new SimpleSchema({
    chartAccount: {
        type: String,
        label: "Chart Account",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.chartAccount();
            }
        }
    }
});
Meteor.startup(function () {
    MapNBCBalance.schema.i18n("acc.mapNBCBalance.schema");
    chartAccountDetail.i18n("acc.chartAccountDetail.schema");
    MapNBCBalance.attachSchema(MapNBCBalance.schema);
});

