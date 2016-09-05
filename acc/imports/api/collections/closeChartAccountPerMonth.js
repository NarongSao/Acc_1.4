
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const CloseChartAccountPerMonth = new Mongo.Collection("accCloseChartAccountPerMonth");
/**
 * Schema
 *
 * @type {AccSchema}
 */
CloseChartAccountPerMonth.schema = new SimpleSchema({
    closeChartAccountId: {
      type: String
    },
    code: {
        type: String,
        label: "Code",
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    value:{
        type: Number,
        defaultValue: 0,
        decimal: true
    },
    closeDate: {
        type: Date,
        label: "Date"
    },
    currencyId: {
        type: String,
        label: "Currency"
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    accountTypeId: {
        type: String,
        label: "Account Type"
    },
    level: {
        type: Number,
        label: "Level"
    },
    parentId: {
        type : String,
        label: "Parent",
        optional: true
    },
    endId: {
        type : String,
        label: "End",
        optional: true
    },
    year: {
        type : String,
        optional: true
    },
    month: {
        type : String,
        optional: true
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    CloseChartAccountPerMonth.schema.i18n("acc.closeChartAccountPerMonth.schema");
    CloseChartAccountPerMonth.attachSchema(CloseChartAccountPerMonth.schema);
});
