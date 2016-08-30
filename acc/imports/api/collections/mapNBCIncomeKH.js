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
export const MapNBCIncomeKH = new Mongo.Collection("accMapNBCIncomeKH");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapNBCIncomeKH.schema = new SimpleSchema({

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
                return SelectOpts.chartAccountNBCKH({accountTypeNBC:"Income"});
            }
        }
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    MapNBCIncomeKH.schema.i18n("acc.mapNBCIncomeKH.schema");
    MapNBCIncomeKH.attachSchema(MapNBCIncomeKH.schema);
});

