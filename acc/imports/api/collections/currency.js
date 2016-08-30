
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 */
export const Currency = new Mongo.Collection("acc_currency");

/**
 * Schema
 */
Currency.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true
    },
    symbol: {
        type: String,
        label: "Symbol",
        unique: true
    },
    num: {
        type: String,
        label: "Num",
        unique: true
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    Currency.schema.i18n("acc.currency.schema");
    Currency.attachSchema(Currency.schema);
});

