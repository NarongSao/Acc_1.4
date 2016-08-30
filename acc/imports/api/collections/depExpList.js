
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';


/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const DepExpList = new Mongo.Collection("accDepExpList");
/**
 * Schema
 *
 * @type {AccSchema}
 */
DepExpList.schema = new SimpleSchema({

    date: {
        type: Date,
        label: "Date",
        defaultValue: function () {
            var currentDate = moment(new Date()).format('YYYY-MM-DD');
            return currentDate;
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    currencyId: {
        type: String,
        label: "Currency"
    },
    account: {
        type: String,
        label: "Account"
    },
    amount: {
        type: Number,
        decimal: true,
        label: "Amount"
    }
    , life: {
        type: Number,
        label: "Life",
        optional: true
    }
    , transactionAsset: {
        type: [Object]
    },
    'transactionAsset.$': {
        type: Object
    },
    'transactionAsset.$.year': {
        type: Number,
        blackbox: true
    },
    'transactionAsset.$.perMonth': {
        type: Number,
        decimal: true,
        blackbox: true
    }, 'transactionAsset.$.perYear': {
        type: Number,
        decimal: true,
        blackbox: true
    }, 'transactionAsset.$.month': {
        type: Number,
        blackbox: true
    }, 'transactionAsset.$.maxMonth': {
        type: Number,
        optional: true
    },
    'transactionAsset.$.status': {
        type: Boolean,
        defaultValue: false
    },
    isDep: {
        type: Boolean,
        defaultValue: false
    },increment: {
        type: Number,
        defaultValue: 0
    },
    journalId: {
        type: String
    },
    code: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    percent: {
        type: Number,
        optional: true
    },
    estSalvage: {
        type: Number,
        optional: true,
        decimal: true
    }
});
/**
 * Attach schema
 */
Meteor.startup(function () {
    DepExpList.schema.i18n("acc.depExpList.schema");
    DepExpList.attachSchema(DepExpList.schema);
});

