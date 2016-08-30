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
export const ChartAccount = new Mongo.Collection("accChartAccount");
/**
 * Schema
 *
 * @type {AccSchema}
 */
ChartAccount.schema = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        unique: true,
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    parentId: {
        type: String,
        label: "Parent",
        optional: true,
        autoform: {
            type: "select2",
           /* afFieldInput: {
                optionsMethod: 'acc.selectOptMethods.parent'
            }*/
            options: function () {
                return SelectOpts.parent();
            }
        }
    },
    accountTypeId: {
        type: String,
        label: "Account Type",
        autoform: {
            type: "select2"
        }
    },
    level:{
        type: Number,
        defaultValue: 0
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    ChartAccount.schema.i18n("acc.chartAccount.schema");
    ChartAccount.attachSchema(ChartAccount.schema);
});

