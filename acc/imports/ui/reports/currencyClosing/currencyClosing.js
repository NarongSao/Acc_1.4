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
// Schema
import {CurrencyClosing} from '../../../../imports/api/collections/reports/currencyClosing';
import {Closing} from '../../../../imports/api/collections/closing';
import {ClosingAccountTabular} from '../../../../common/tabulars/closing';

// Declare template

var reportTpl = Template.acc_currencyClosingReport,
    generateTpl = Template.acc_currencyClosingReportGen;


reportTpl.helpers({
    selector: function () {
        return {branchId : Session.get("currentBranch")};
    },
    schema() {
        return CurrencyClosing;
    },
    tabularTable(){
        return ClosingAccountTabular;
    }
})



reportTpl.events({
    'click .gae': function (e, t) {
        Meteor.call('generateAndEntry', true);
        Meteor.call('print', false);
    },
    'click .g': function (e, t) {
        Meteor.call('generateAndEntry', false);
        Meteor.call('print', false);
    },
    'click .gaep': function (e, t) {
        Meteor.call('generateAndEntry', true);
        Meteor.call('print', true);
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var lastEnd = Closing.findOne({}, {
            sort: {
                dateTo: -1
            }
        });
        var cur = Closing.findOne({
            _id: id
        });
            if (moment(lastEnd.dateTo).format("YYYY-MM-DD") == moment(cur.dateTo).format("YYYY-MM-DD")) {
                alertify.confirm("Are you sure to delete ?")
                    .set({
                        onok: function (closeEvent) {
                            Meteor.call('closingRemove', id);
                        },
                        title: fa("remove", "Closing")
                    });
            } else {
                alertify.error(
                    "You can't delete. This is not the last Closing!!!");
            }
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
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        /*Fetcher.setDefault('data',false);
         Fetcher.retrieve('data','acc_currencyClosingReport',q, Session.get("currentBranch"));

         return Fetcher.get('data');*/
        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_currencyClosingReport', q, Session.get("currentBranch"));

        if (!call.ready()) {
            return false;
        }
        return call.result();
    },
    check: function (data) {
        if (data.generateAndEntry == true) {
            if (data.insertBaseSuccess == true && data.insertSuccess == true) {
                alertify.success("Entry Success.");

            } else {
                alertify.error("Entry Fail.");

            }
        }
    }
});





