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
export const MapNBCBalanceKH = new Mongo.Collection("accMapNBCBalanceKH");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapNBCBalanceKH.schema = new SimpleSchema({

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
    },
    chartAccountNBCId: {
        type: String,
        label: "NBC Account",
        autoform: {
            type: "select2",
            options: function () {
                var selector={};
                selector.accountTypeNBC="Balance";
                return SelectOpts.chartAccountNBCKH({accountTypeNBC:"Balance"});
            }
        }
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    MapNBCBalanceKH.schema.i18n("acc.mapNBCBalanceKH.schema");
    MapNBCBalanceKH.attachSchema(MapNBCBalanceKH.schema);
});
