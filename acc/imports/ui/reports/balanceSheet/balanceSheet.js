import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import 'meteor/theara:autoprint';
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';


// Component
import '../../../../../core/imports/ui/layouts/report/content.html';
import '../../../../../core/imports/ui/layouts/report/sign-footer.html';
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/form-footer.js';

// Method
// import '../../../../common/methods/reports/balanceSheet.js';
import '../../libs/getBranch';
import '../../libs/format';
// Schema
import {BalanceSheetSchema} from '../../../../imports/api/collections/reports/balanceSheet.js';

// Page
import './balanceSheet.html';
// Declare template
var reportTpl = Template.acc_balanceSheetReport,
    generateTpl = Template.acc_balanceSheetReportGen,
    generateTplForAll = Template.acc_balanceSheetForAllReportGen;



reportTpl.helpers({
    schema() {
        return BalanceSheetSchema;
    }
})


generateTplForAll.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    dataMain: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        var callId = JSON.stringify(q);

        var call = Meteor.callAsync(callId, 'acc_BalanceSheetMulti', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();


       /* Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'acc_BalanceSheetMulti', q);

        return Fetcher.get('data');*/

    }
});

generateTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    dataMain: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        /*Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','acc_BalanceSheet',q);

        return Fetcher.get('data');*/


        var callId = JSON.stringify(q);

        var call = Meteor.callAsync(callId, 'acc_BalanceSheet', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();
    }
});







