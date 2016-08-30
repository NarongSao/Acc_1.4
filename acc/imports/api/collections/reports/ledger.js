import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {SelectOpts} from '../../../ui/libs/select-opts.js';
import {SelectOptsReport} from '../../../ui/libs/select-opts.js';
import {dateRangePickerOpts} from '../../../../../core/client/libs/date-range-picker-opts';

export const LedgerReport = new SimpleSchema({
  branchId: {
    type: String,
    label: "Branch",
    max: 100,
    defaultValue: "All",
    autoform: {
      type: "select2",
      options: function() {
        return SelectOptsReport.branch();
      }
    }
  },
  accountType: {
    type: [String],
    label: "Account Type",
    autoform: {
      type: "select-multiple",
      options: function() {
        return SelectOptsReport.accountType();
      }
    }
  },
  currencyId: {
    type: String,
    label: "Currency",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        return SelectOpts.currency();
      }
    }
  },
  date: {
    type: [Date],
    label: 'Date',
    autoform: {
      type: "bootstrap-daterangepicker",
      afFieldInput: {
        dateRangePickerOptions: dateRangePickerOpts
      }
    }
  },
  exchangeDate: {
    type: String,
    label: "Exchange Date",
    autoform: {
      type: "select2",
      options: function() {
        return SelectOptsReport.exchange();
      }
    }

  },
  chartAccount: {
    type: String,
    label: "Chart Account",
    autoform: {
      type: "select2",
      defaultValue: "All",
      options: function() {
        return SelectOptsReport.chartAccountId();
      }
    }

  }
});
