import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {SelectOpts} from '../../../ui/libs/select-opts.js';
import {SelectOptsReport} from '../../../ui/libs/select-opts.js';

export const TrialBalanceReport = new SimpleSchema({
    branchId: {
        type: String,
        label: "Branch",
        max: 100,
        defaultValue: "All",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOptsReport.branch();
            }
        }
    },
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select2",
            defaultValue: "All",
            options: function () {
                return SelectOpts.currency();
            }
        }
    },
    date: {
        type: Date,
        label: "Date As",
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
    exchangeDate: {
        type: String,
        label: "Exchange Date",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOptsReport.exchange();
            }
        }

    }
})
