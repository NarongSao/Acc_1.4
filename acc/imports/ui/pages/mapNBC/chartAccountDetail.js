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
import {chartAccountDetail} from '../../../api/collections/mapNBCBalance';

//Method
import {SpaceChar} from '../../../../common/configs/space';
// Page
import './chartAccountDetail.html';

// Declare template
var chartAccountDetailTPL = Template.acc_chartAccountDetail;


var chartAccountDetailCollection;

//Created
chartAccountDetailTPL.onCreated(function () {
    let data = Template.currentData();
    chartAccountDetailCollection = data.chartAccountDetailCollection;
    chartAccountDetailCollection.remove({});

    if (data.transaction) {
        data.transaction.forEach(function (obj) {
            obj.chartAccount = Spacebars.SafeString(SpaceChar.space(obj.accountDoc.level * 6) + obj.account).string;
            chartAccountDetailCollection.insert(obj);
        })
    }
})

/**
 * JournalDetail
 */
chartAccountDetailTPL.helpers({
    detail () {
        return chartAccountDetailCollection.find().fetch();
    },
    schema(){

        return chartAccountDetail;
    }
});

chartAccountDetailTPL.events({
    'click .addItem': function (e, t) {

        var detail = {};
        detail.chartAccount = t.$('[name="chartAccount"]').val();
        chartAccountDetailCollection.insert(detail);
    },
    'click .removeItem': function (e, t) {
        var self = this;
        chartAccountDetailCollection.remove(self._id);
    }
});




