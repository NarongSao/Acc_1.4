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
import './journalDetailPaymentReceive.html';
import '../../libs/format.js';
import '../../components/style.css';

// Declare template

// Declare template
var journalDetailPaymentReceiveTpl = Template.acc_journalDetailPaymentReceive;


var journalDetailPaymentReceiveCollection;

//Created
journalDetailPaymentReceiveTpl.onCreated(function () {
    let data = Template.currentData();
    journalDetailPaymentReceiveCollection = data.journalDetailPaymentReceiveCollection;
    journalDetailPaymentReceiveCollection.remove({});
    if (data.transaction) {
        data.transaction.forEach(function (obj) {
            obj.account = Spacebars.SafeString(SpaceChar.space(obj.accountDoc.level * 6) + obj.account).string;
            journalDetailPaymentReceiveCollection.insert(obj);
        })
    }
})


//Helper
journalDetailPaymentReceiveTpl.helpers({
    journals: function () {
        return journalDetailPaymentReceiveCollection.find().fetch();
    },
    schema(){
        return Journal.journalDetalPaymentReceive;
    },
    keyArgs(index, name){
        return `transaction.${index}.${name}`;
    },
    tmpAmount(){

    }
});


// Event
journalDetailPaymentReceiveTpl.events({
    'click .addItem': function (e, t) {
        var journal = {};
        // journal.account = (t.$('[name="account"]').val()).split('\u00A0')[(t.$('[name="account"]').val()).split('\u00A0').length - 1];
        journal.account = t.$('[name="account"]').val();
        journal.amount = parseFloat(t.$('[name="amount"]').val());

        let isInsert = journalDetailPaymentReceiveCollection.insert(journal);

        $('[name="account"]').select2('val', '');
    },
    'click .js-destroy-item': function (e, t) {
        let self = this;
        let isRemove = journalDetailPaymentReceiveCollection.remove(self._id);
    }
});



