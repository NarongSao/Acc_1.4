import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const FixAssetExpense = new Mongo.Collection("accFixAssetExpense");
/**
 * Schema
 *
 * @type {AccSchema}
 */
FixAssetExpense.schema = new SimpleSchema({

    date: {
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
    branchId: {
        type: String,
        label: "Branch",
        optional: true
    }, transactionExpense: {
        type: [Object],
        minCount: 1,
        optional: true
    },
    'transactionExpense.$': {
        type: Object
    },
    'transactionExpense.$.depExpListId': {
        type: String,
        label: "DepExpListId"
    },
    'transactionExpense.$.account': {
        type: String,
        max: 200,
        label: "Account"
    },
    'transactionExpense.$.buyDate': {
        type: Date,
        label: "Buy Date"
    },
    'transactionExpense.$.value': {
        type: Number,
        decimal: true,
        blackbox: true
    },
    'transactionExpense.$.currencyId': {
        type: String,
        label: "Currency"
    },
    'transactionExpense.$.journalId': {
        type: String,
        optional: true
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    FixAssetExpense.schema.i18n("acc.fixAssetExpense.schema");
    FixAssetExpense.attachSchema(FixAssetExpense.schema);
});

