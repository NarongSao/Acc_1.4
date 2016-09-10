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
// import '../../../../common/methods/reports/profitLost';
import '../../libs/getBranch';
import '../../libs/format';
// Schema
import {ProfitLostReport} from '../../../../imports/api/collections/reports/profitLost';

// Page
import './profitLost.html';
// Declare template

var reportTpl = Template.acc_ProfitLostReport,
    generateTpl = Template.acc_ProfitLostReportGen,
    generateTplForAll = Template.acc_ProfitLostForAllReportGen;

reportTpl.onRendered(function () {
    switcherFun();
})

reportTpl.helpers({
    schema() {
        return ProfitLostReport;
    }
})


generateTplForAll.events({
    'dblclick .profitRow': function (e, t) {
            var params={};
            var queryParams={};

         var q = FlowRouter.current().queryParams;
         var self=this;

        queryParams.branchId=q.branchId;
        queryParams.currencyId=q.currencyId;
        queryParams.date=q.date;

        var code=  replaceAll(self.code,"&nbsp;","");

         var account=Acc.Collection.ChartAccount.findOne({code: code});
        var accountTypeId=[];
        accountTypeId.push(account.accountTypeId);

        queryParams.chartAccount=account._id;
        queryParams.accountType=accountTypeId;

        var path = FlowRouter.path("acc.journalReportGen", params, queryParams);

        window.open(path,"_blank");

    }
});

generateTpl.events({
    'dblclick .profitRow': function (e, t) {
            var params={};
            var queryParams={};

         var q = FlowRouter.current().queryParams;
         var self=this;

        queryParams.branchId=q.branchId;
        queryParams.currencyId=q.currencyId;
        queryParams.date=q.date;

        var code=  replaceAll(self.code,"&nbsp;","");

         var account=Acc.Collection.ChartAccount.findOne({code: code});
        var accountTypeId=[];
        accountTypeId.push(account.accountTypeId);

        queryParams.chartAccount=account._id;
        queryParams.accountType=accountTypeId;

        var path = FlowRouter.path("acc.journalReportGen", params, queryParams);

        window.open(path,"_blank");

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
    }
    ,data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

       /* var tmp='acc_profitLost';
        if(q.currencyId="All"){
            tmp='acc_profitLostForAll';
        }*/

        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','acc_profitLost',q);

        return Fetcher.get('data');

       /* var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId,'acc_profitLost', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});


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
    }
    ,data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_profitLostForAll', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();
    }
});

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var   switcherFun = function () {
    var elem = document.querySelector('.js-switch');
    var init = new Switchery(elem, {
        color: '#7c8bc7',
        jackColor: '#9decff',
        size: 'small'
    });
};





