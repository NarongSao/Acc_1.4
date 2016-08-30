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

// Collection
import {ChartAccount} from '../../../api/collections/chartAccount';
import {Journal} from '../../../api/collections/journal';


//Method
import {SpaceChar} from '../../../../common/configs/space';

// Component
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/column-action.js';
import '../../../../../core/client/components/form-footer.js';


// Page
import './fixAsset.html';
import '../../components/style.css';

// Declare template
var fixAssetTpl = Template.acc_FixAsset,
    updateTpl = Template.acc_FixAssetUpdate,
    actionFixAssetTmpl=Template.acc_actionFixAsset;


var stateAsset = new ReactiveObj({
    account: "",
    value: 0,
    life: 0,
    estSalvage: 0,
    des: "",
    code: "",
    percent: 0,
    cssClassForAddMoreFixedAsset: 'disabled'
});

var fixAssetDepCollection;
fixAssetTpl.onCreated(function () {
    let data = Template.currentData();
    fixAssetDepCollection = data.fixAssetDepCollection;
    fixAssetDepCollection.remove({});
    if(data.transactionAsset){
        data.transactionAsset.forEach(function (obj) {
            fixAssetDepCollection.insert(obj);
        })
    }
    createNewAlertify('fixAsset');
})

fixAssetTpl.helpers({
    cssClassForAddMoreFixedAsset: function () {
        var account = stateAsset.get('account');
        var value = stateAsset.get('value');
        var life = stateAsset.get('life');
        var estSalvage = stateAsset.get('estSalvage');

        if (value != "" && life != "" && account != "" && estSalvage != "") {
            stateAsset.set('cssClassForAddMoreFixedAsset', '');
        } else {
            stateAsset.set('cssClassForAddMoreFixedAsset', 'disabled');
        }
        return stateAsset.get('cssClassForAddMoreFixedAsset');
    },
    fixAsset: function () {
        return fixAssetDepCollection.find().fetch();
    },
    schema(){
        return Journal.fixAssetSchema;
    }
})


fixAssetTpl.events({
    'click .addItem': function (e, t) {
        let accountOrg = $('[name="account"]').val();
        let value = $('[name="value"]').val();
        let life = $('[name="life"]').val();
        let estSalvage = $('[name="estSalvage"]').val();
        let code = $('[name="code"]').val();
        let itemDes = $('[name="description"]').val();
        let percent = $('[name="percent"]').val();

        fixAssetDepCollection.insert({
            account: accountOrg,
            value: value,
            life: life,
            estSalvage: estSalvage,
            code: code,
            percent: percent,
            description: itemDes
        });


        $('#account').select2('val', '');
        $('#code').val('');
        $('#value').val(0);
        $('#life').val(0);
        $('#estSalvage').val(0);
        $('#description').val('');
        $('#percent').val(0);

        stateAsset.set('account', "");
        stateAsset.set('value', 0);
        stateAsset.set('life', 0);
        stateAsset.set('estSalvage', 0);
        stateAsset.set('code', "");
        stateAsset.set('percent', 0);
        stateAsset.set('itemDes', "");


    },
    'click .js-destroy-item': function (e, t) {
        var self = this;
        fixAssetDepCollection.remove({_id: self._id});
    },
    'change #account': function (e, t) {
        stateAsset.set('account', $(e.currentTarget).val())
    },
    'change #code': function (e, t) {
        stateAsset.set('code', $(e.currentTarget).val())
    },
    'keyup #value': function (e, t) {
        stateAsset.set('value', $(e.currentTarget).val());
    },
    'keyup #life': function (e, t) {
        stateAsset.set('life', $(e.currentTarget).val());
    },
    'keyup #estSalvage': function (e, t) {
        stateAsset.set('estSalvage', $(e.currentTarget).val());
    },
    'keyup #description': function (e, t) {
        stateAsset.set('itemDes', $(e.currentTarget).val());
    },
    'keyup #percent': function (e, t) {
        stateAsset.set('percent', $(e.currentTarget).val());
    },
    'click .js-update-item': function (e, t) {
        var self = this;
        var doc = fixAssetDepCollection.findOne(self._id);
        alertify.fixAsset(fa("pencil", "Fix Asset"), renderTemplate(updateTpl, doc));
    }
});

updateTpl.helpers({
    schema(){
        return Journal.fixAssetSchema;
    }
});


AutoForm.hooks({
    acc_FixAssetUpdate: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            fixAssetDepCollection.update(
                {_id: currentDoc._id},
                updateDoc
            );
            this.done();
        },
        onSuccess: function (formType, result) {
            alertify.fixAsset().close();
            alertify.success("Success");

        },
        onError: function (formTupe, error) {
            alertify.error(error.message);
        }
    }
});


