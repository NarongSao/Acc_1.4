
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const ChartAccountNBCKH = new Mongo.Collection("accChartAccountNBCKH");
/**
 * Schema
 *
 * @type {AccSchema}
 */
ChartAccountNBCKH.schema = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    accountTypeNBC: {
        type: String,
        label: "Account Type"
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    ChartAccountNBCKH.schema.i18n("acc.chartAccountNBCKH.schema");
    ChartAccountNBCKH.attachSchema(ChartAccountNBCKH.schema);
});

