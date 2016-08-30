import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AutoForm} from 'meteor/aldeed:autoform';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import 'meteor/theara:autoprint';
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';
import {alertify} from 'meteor/ovcharik:alertifyjs';


// Component

import '../../../../../core/imports/ui/layouts/report/content.html';
import '../../../../../core/imports/ui/layouts/report/sign-footer.html';
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/form-footer.js';

//Lib
import {createNewAlertify} from '../../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../../core/client/libs/display-alert.js';
import {__} from '../../../../../core/common/libs/tapi18n-callback-helper.js';


//Collection
import {Currency} from '../../../api/collections/currency';
import {ChartAccount} from '../../../api/collections/chartAccount';
// Method
// import '../../../../common/methods/reports/ledger';
import '../../libs/getBranch';
import '../../libs/format';
// Schema
import {LedgerReport} from '../../../../imports/api/collections/reports/ledger';

// Page
import './ledger.html';
// Declare template

var reportTpl = Template.acc_ledgerReport,
    generateTpl = Template.acc_ledgerReportGen,
    ledgerTpl = Template.acc_ledgerReportGen,
    ledgerShow = Template.acc_LedgerShow;


reportTpl.helpers({
    schema() {
        return LedgerReport;
    }
})




reportTpl.events({
   'change [name="accountType"]':function(e){
       Session.set('accountTypeIdSession',$(e.currentTarget).val());
   }
});

ledgerTpl.onRendered(function() {
    // Create new  alertify
    createNewAlertify("showJournal");
});
//Event
ledgerTpl.events({
    'click .split-account-detail': function (e, t) {
        var self = this;
        /*var tr = $(e.currentTarget).closest("tr");
         var voucher= tr.find('.voucher-id').text().trim();*/
        // var data = Acc.Collection.Journal.findOne({voucherId: self.voucherId,_id: self._id});

        Meteor.call('getJournalForLedger',self.voucherId,self._id,function (err,data) {
            alertify.showJournal(fa("eye", "Journal"),renderTemplate(ledgerShow, data));
        })
    }
});


//Helper
ledgerShow.helpers({
    formatMoney: function (val) {
        return numeral(val).format('0,0.00');
    },
    getCurrency: function (id) {
        let currency= Currency.findOne({_id: id});
        if(currency){
           return currency.symbol;
        }
    },
    getChartAccount: function (id) {
        let account=ChartAccount.findOne({_id: id});
        if(account){
            return account.name;
        }
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
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','acc_ledgerReport',q);

        return Fetcher.get('data');
       /* var callId = JSON.stringify(q);

        var call = Meteor.callAsync(callId, 'acc_ledgerReport', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});



/*AutoForm.hooks({
    // Customer
    acc_LedgerReport: {
        onSubmit: function (doc) {
            /!*
           doc.accountType=doc.accountType.join(",");
            return doc;*!/
            doc.date=doc.date.replace(' ','+');
            doc.date=doc.date.replace(' ','+');
            var path='/acc/ledgerReportGen?branchId='+doc.branchId+'&accountType='+
                doc.accountType+'&chartAccount='+doc.chartAccount
                +'&date='+doc.date+'&exchangeDate='+doc.exchangeDate
                +'&currencyId='+doc.currencyId;
            window.open(path,'_blank');
            return false;
        }
    }
});*/






