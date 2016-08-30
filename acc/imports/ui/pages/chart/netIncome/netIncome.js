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
import {createNewAlertify} from '../../../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../../../core/client/libs/display-alert.js';
import {__} from '../../../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../../../core/client/components/loading.js';
import '../../../../../../core/client/components/column-action.js';
import '../../../../../../core/client/components/form-footer.js';

import './netIncome.html';

// Declare template


var indexTpl = Template.acc_chartNetIncome;
var myNewChart=null;
Tracker.autorun(function () {
    if (Session.get('chart')) {
        drawChart(Session.get('chart'));
    }
});

indexTpl.onRendered(function () {
    if (Session.get('chart') === undefined) {
        let selector = {};
        selector.year = moment().format("YYYY");
        selector.currency = "usd";
        Session.set('currency', 'usd');
        Meteor.call('chart_netIncome', selector, function (err, result) {
            Session.set('chart', result);
        });
    }
    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#yearpicker').append($('<option />').val(i).html(i));
    }

});

indexTpl.events({
    'click #usd': function () {
        let selector = {};
        let year = $("#yearpicker").val();
        selector.year = year;
        selector.currency = "usd";
        Session.set('currency', 'usd');
        Meteor.call('chart_netIncome', selector, function (err, result) {
            Session.set('chart',result);
        });
    }, 'click #khr': function () {

        let selector = {};
        let year = $("#yearpicker").val();
        selector.year = year;
        selector.currency = "khr";
        Session.set('currency', 'khr');
        Meteor.call('chart_netIncome', selector, function (err, result) {
            Session.set('chart',result);
        });
    }, 'click #baht': function () {
        let selector = {};
        let year = $("#yearpicker").val();
        selector.year = year;
        selector.currency = "baht";
        Session.set('currency', 'baht');
        Meteor.call('chart_netIncome', selector, function (err, result) {
            Session.set('chart',result);
        });
    }, 'change #yearpicker': function () {
        let selector = {};
        let year = $("#yearpicker").val();
        selector.year = year;
        let currency = Session.get('currency');
        selector.currency = currency;
        Meteor.call('chart_netIncome', selector, function (err, result) {
            Session.set('chart',result);
        });
    }
})


indexTpl.onDestroyed(function () {
    Session.set('chart', undefined);
});


var drawChart=function (data) {
    let m_data=data;

    $('#bar-chart-container').html(''); //remove canvas from container
    $('#bar-chart-container').html('<canvas id="myChart" height="400" width="900"></canvas>');

    Meteor.setTimeout(function () {
        var ctx = $("#myChart").get(0).getContext("2d");
        myNewChart = new Chart(ctx, {});
        new Chart(ctx).Bar(m_data, {
            scaleBeginAtZero: false,
            scaleLabel: "<%=numeral(value).format('0,0.00')%>",
            tooltipTemplate: "<%= numeral(value).format('0,0.00') %>"
        });
    },300);

}

