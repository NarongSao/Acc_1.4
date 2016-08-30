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
// import '../../../../common/methods/reports/trialBalance';
import '../../libs/getBranch';
import '../../libs/format';
// Schema
import {TrialBalanceReport} from '../../../../imports/api/collections/reports/trialBalance';

// Page
import './trialBalance.html';
// Declare template

var reportTpl = Template.acc_trialBalanceReport,
    generateTpl = Template.acc_trialBalanceReportGen;

reportTpl.helpers({
    schema() {
        return TrialBalanceReport;
    }
})



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
    }
    ,data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;


        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','acc_trialBalanceReport',q);

        return Fetcher.get('data');

       /* var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_trialBalanceReport', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});





