import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

/**
 * Collection
 */
export const NetInCome = new Mongo.Collection("acc_netIncome");

/**
 * Schema
 */
NetInCome.schema = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    riel: {
        type: Number,
        decimal: true
    },
    dollar: {
        type: Number,
        decimal: true
    },
    baht: {
        type: Number,
        decimal: true
    },
    endId:{
        type: String
    },
    year: {
        type: String
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
    NetInCome.schema.i18n("acc.netInCome.schema");
    NetInCome.attachSchema(NetInCome.schema);
});
