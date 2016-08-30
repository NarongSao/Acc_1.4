
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 */
export const ExchangeNBC = new Mongo.Collection("acc_exchangeNBC");

/**
 * Schema
 */
var Rates = new SimpleSchema({
    KHR: {
        type: String,
        decimal: true,
        label: "KHR"
    },
    USD: {
        type: String,
        decimal: true,
        label: "USD"
    },
    THB: {
        type: String,
        decimal: true,
        label: "THB"
    }
});

ExchangeNBC.schema = new SimpleSchema({
    dateTime: {
        unique: true,
        type: Date,
        label: "Journal Date",
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    base: {
        type: String,
        label: "Base currency"
    },
    rates: {
        type: Rates
    }
});

/**
 * Attach schema
 */

Meteor.startup(function () {
    ExchangeNBC.schema.i18n("acc.exchangeNBC.schema");
    ExchangeNBC.attachSchema(ExchangeNBC.schema);
});

