import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

export const AccountType = new Mongo.Collection("accAccountType");


AccountType.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    }
});

Meteor.startup(function () {
    AccountType.schema.i18n("acc.accountType.schema");
    AccountType.attachSchema(AccountType.schema);
});

