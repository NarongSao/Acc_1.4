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
export const MapNBCIncome = new Mongo.Collection("accMapNBCIncome");
/**
 * Schema
 *
 * @type {AccSchema}
 */
MapNBCIncome.schema = new SimpleSchema({

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
                return SelectOpts.chartAccountNBC({accountTypeNBC:"Income"});
            }
        }
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    MapNBCIncome.schema.i18n("acc.mapNBCIncome.schema");
    MapNBCIncome.attachSchema(MapNBCIncome.schema);
});
