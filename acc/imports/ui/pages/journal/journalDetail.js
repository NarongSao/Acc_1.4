import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {moment} from 'meteor/momentjs:moment';
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';


// Lib
import {createNewAlertify} from '../../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../../core/client/libs/display-alert.js';
import {__} from '../../../../../core/common/libs/tapi18n-callback-helper.js';


// Component
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/column-action.js';
import '../../../../../core/client/components/form-footer.js';

// Collection
import {Journal} from '../../../api/collections/journal';
import {ChartAccount} from '../../../api/collections/chartAccount';
import {AccountType} from '../../../api/collections/accountType';


//Method
import {SpaceChar} from '../../../../common/configs/space';


// Page
import './journalDetail.html';
import '../../libs/format.js';
import '../../components/style.css';

// Declare template

// Declare template
var journalDetailTpl = Template.acc_journalDetail,
    updateTpl = Template.acc_journalDetailUpdate;


var journalDetailCollection;

//Created
journalDetailTpl.onCreated(function () {
    let data = Template.currentData();
    journalDetailCollection = data.journalDetailCollection;
    journalDetailCollection.remove({});
    if (data.transaction) {
        data.transaction.forEach(function (obj) {
            obj.account = Spacebars.SafeString(SpaceChar.space(obj.accountDoc.level * 6) + obj.account).string;
            journalDetailCollection.insert(obj);
        })
    }
    createNewAlertify('journalDetail');
    Meteor.setTimeout(function () {
        Session.set('isTotal', true);
    }, 200)
})


//Helper
journalDetailTpl.helpers({
    cssClassForAddMore: function () {
        let dr = state.get('dr');
        let cr = state.get('cr');
        let account = state.get('account');
        if ((dr > 0 || cr > 0) && (dr != "" || cr != "") && account != "") {
            state.set('cssClassForAddMore', '');
        } else {
            state.set('cssClassForAddMore', 'disabled');
        }
        return state.get('cssClassForAddMore');
    },
    journals: function () {
        return journalDetailCollection.find().fetch();
    },
    schema(){
        return Journal.journalDetal;
    },
    keyArgs(index, name){
        return `transaction.${index}.${name}`;
    },
    tmpDr(){
        return state.get('dr');
    },
    tmpCr(){
        return state.get('cr');
    }
});

updateTpl.helpers({
    schema(){
        return Journal.journalDetal;
    },
    tmpDr(){
        return state.get('drUpdate');
    },
    tmpCr(){
        return state.get('crUpdate');
    }
});

// Event
journalDetailTpl.events({
    'change [name="account"]': function (e, t) {
        state.set('account', t.$(e.currentTarget).val());

        let totalDr = state.get("totalDr");
        let totalCr = state.get("totalCr");
        let bal = totalDr - totalCr;
        if (bal > 0) {
            state.set('dr', 0);
            state.set('cr', bal);
        } else {
            state.set('dr', -bal);
            state.set('cr', 0);
        }
    },
    'keyup [name="dr"]': function (e, t) {
        state.set('dr', parseFloat(t.$(e.currentTarget).val()));
        state.set('cr', 0);
    },
    'keyup [name="cr"]': function (e, t) {
        state.set('cr', parseFloat(t.$(e.currentTarget).val()));
        state.set('dr', 0);
    },
    'click .addItem': function (e, t) {
        var journal = {};
        // journal.account = (t.$('[name="account"]').val()).split('\u00A0')[(t.$('[name="account"]').val()).split('\u00A0').length - 1];
        journal.account = t.$('[name="account"]').val();
        journal.dr = parseFloat(t.$('[name="dr"]').val());
        journal.cr = parseFloat(t.$('[name="cr"]').val());

        let isInsert = journalDetailCollection.insert(journal);
        if (isInsert) {
            Session.set('isTotal', true);
        }
        $('[name="account"]').select2('val', '');

        state.set('dr', 0);
        state.set('cr', 0);
        state.set('account', "");

        Meteor.defer(function () {
            disableSubmit();
        });

    },
    'click .js-destroy-item': function (e, t) {
        let self = this;
        let isRemove = journalDetailCollection.remove(self._id);
        Meteor.defer(function () {
            disableSubmit();
        });
        if (isRemove) {
            Session.set('isTotal', true);
        }
    },
    'click .js-update-item': function (e, t) {
        var self = this;
        var doc = journalDetailCollection.findOne(self._id);
        Session.set('accountUpdate',doc.account);
        alertify.journalDetail(fa("pencil", "Journal Detail"), renderTemplate(updateTpl, doc));
    }
});

updateTpl.events({
    'keyup [name="dr"]': function (e, t) {
        state.set('drUpdate', parseFloat(t.$(e.currentTarget).val()));
        state.set('crUpdate', 0);
    },
    'keyup [name="cr"]': function (e, t) {
        state.set('crUpdate', parseFloat(t.$(e.currentTarget).val()));
        state.set('drUpdate', 0);
    },
    'change [name="account"]': function (e,t) {
        Session.set('accountUpdate',t.$(e.currentTarget).val());
    }
})


var disableSubmit = function () {
    let debitcheck = state.get('totalDr');
    let creditcheck = state.get('totalCr');
    if (creditcheck != debitcheck || (debitcheck == 0 && creditcheck == 0)) {
        $('.save-journal').attr('disabled', true);
    } else {
        $('.save-journal').attr('disabled', false);
    }
};

//Destroy

journalDetailTpl.onDestroyed(function () {
    Session.set('isTotal', undefined);
});


//Hook
AutoForm.hooks({
    acc_journalDetailUpdate: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            updateDoc.$set.account=Session.get('accountUpdate');
            journalDetailCollection.update(
                {_id: currentDoc._id},
                updateDoc
            );
            this.done();
        },
        onSuccess: function (formType, result) {
            alertify.journalDetail().close();
            Session.set('accountUpdate',undefined);
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
}
});



