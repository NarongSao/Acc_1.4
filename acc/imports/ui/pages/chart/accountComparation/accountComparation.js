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

// Collection
import {CloseChartAccountPerMonth} from '../../../../api/collections/closeChartAccountPerMonth';
import {ChartAccount} from '../../../../api/collections/chartAccount';
import {AccountType} from '../../../../api/collections/accountType';


import './accountComparation.html';

// Declare template


var indexTpl = Template.acc_accountComparation;
var stateSelectorChart = new ReactiveObj({
    currency: "USD",
    yearSelect: moment().format("YYYY"),
    accountType: 10
})



var Highcharts = require('highcharts/highstock');



indexTpl.onRendered(function () {
    stateSelectorChart.set('currency', 'USD');



    for (i = new Date().getFullYear(); i > 1900; i--) {
        $('#yearpicker').append($('<option />').val(i).html(i));
    }
    stateSelectorChart.set('yearSelect',$("#yearpicker").val());
    stateSelectorChart.set('accountType',$("#accountType").val());

    getDataForChart();
});

indexTpl.events({
    'click #usd': function () {
        stateSelectorChart.set('currency', 'USD');
        getDataForChart();
    }, 'click #khr': function () {
        stateSelectorChart.set('currency', 'KHR');
        getDataForChart();
    }, 'click #baht': function () {
        stateSelectorChart.set('currency', 'THB');
        getDataForChart();
    }, 'change #yearpicker': function () {
        stateSelectorChart.set('yearSelect', $("#yearpicker").val());
        getDataForChart();
    }, 'change #accountType': function () {
        stateSelectorChart.set('accountType', $("#accountType").val());
        getDataForChart();
    }
})


if (Meteor.isClient) {
    indexTpl.helpers({

        accountTypeList: function () {
            let accountTypeList =[];
            AccountType.find().fetch().forEach(function (obj) {
                accountTypeList.push({value: obj._id,label: obj.name});
            })
            return accountTypeList;
        },
        createChartProfitLostComparation: function () {
            // Gather data:
            debugger;

            var obj=Session.get("obj");
            $('#chart').empty();

            // Use Meteor.defer() to craete chart after DOM is ready:

                Meteor.defer(function () {
                    // Create standard Highcharts chart with options:
                    $.each(obj.datasets, function (i, dataset) {

                        // Add X values
                        dataset.data = Highcharts.map(dataset.data, function (val, j) {
                            return [obj.xData[j], val];
                        });


                        $('<div class="chart">')
                            .appendTo('#chart')
                            .highcharts({
                                chart: {
                                    marginLeft: 40, // Keep all charts left aligned
                                    spacingTop: 20,
                                    spacingBottom: 20
                                },
                                title: {
                                    text: dataset.name,
                                    align: 'left',
                                    margin: 0,
                                    x: 30
                                },
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: false
                                },
                                xAxis: {
                                    crosshair: true,
                                    /*events: {
                                     setExtremes: syncExtremes
                                     },*/
                                    labels: {
                                        format: '{value} '
                                    },
                                    categories: obj.xData,
                                    title: {
                                        text: null
                                    }
                                },
                                yAxis: {
                                    title: {
                                        text: null
                                    }
                                },
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    positioner: function () {
                                        return {
                                            x: this.chart.chartWidth - this.label.width, // right aligned
                                            y: -1 // align to title
                                        };
                                    },
                                    borderWidth: 0,
                                    backgroundColor: 'none',
                                    pointFormat: '{point.y}',
                                    headerFormat: '',
                                    shadow: false,
                                    style: {
                                        fontSize: '18px'
                                    },
                                    valueDecimals: 1
                                },
                                series: [{
                                    data: dataset.data,
                                    name: dataset.name,
                                    type: 'line',
                                    color: Highcharts.getOptions().colors[i],
                                    fillOpacity: 0.3/*,
                                     tooltip: {
                                     valueSuffix: ' ' + dataset.unit
                                     }*/
                                }]
                            });


                    });

            })
    }
})
;
}


//Chart from HighChart
/*if (Meteor.isClient) {
 indexTpl.helpers({
 createChartProfitLostComparation: function () {
 // Gather data:
 debugger;

 let selector = {};
 selector.year = moment().format("YYYY");
 selector.currencyId = "USD";

 Meteor.call("chart_accountEveryMonth", selector, function (err, obj) {
 // Use Meteor.defer() to craete chart after DOM is ready:
 Meteor.defer(function () {
 // Create standard Highcharts chart with options:
 Highcharts.chart('chart', {
 title: {
 text: 'Chart Account Value During The Year'
 },
 xAxis: {
 categories: obj.chartAccountList,
 title: {
 text: null
 }
 },
 yAxis: {
 // min: 0,
 title: {
 text: 'Value',
 align: 'high'
 },
 labels: {
 overflow: 'justify'
 }
 },
 plotOptions: {
 line: {
 dataLabels: {
 enabled: true
 }
 }
 },
 legend: {
 layout: 'vertical',
 align: 'right',
 verticalAlign: 'top',
 x: -20,
 y: 0,
 floating: true,
 borderWidth: 1,
 backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
 shadow: true
 },
 credits: {
 enabled: false
 },
 series: obj.data
 });
 });
 })
 }
 });
 }*/



// Chart From Chart:Chart
/*
 var myNewChart = null;
 Tracker.autorun(function () {
 if (Session.get('chartProfitComparation')) {
 drawChartProfitComparation(Session.get('chartProfitComparation'));
 }
 });






 indexTpl.onDestroyed(function () {
 Session.set('chartProfitComparation', undefined);
 });


 var drawChartProfitComparation = function (data) {
 let m_data=data;
 // let m_data = [1, 2, 3, 4];
 $('#bar-chart-container').html(''); //remove canvas from container
 $('#bar-chart-container').html('<canvas id="myChart" height="400" width="3000"></canvas>');

 Meteor.setTimeout(function () {
 var ctx = $("#myChart").get(0).getContext("2d");
 myNewChart = new Chart(ctx, {});
 new Chart(ctx).Bar(m_data, {
 scaleBeginAtZero: false,
 scaleLabel: "<%=numeral(value).format('0,0.00')%>",
 tooltipTemplate: "<%= numeral(value).format('0,0.00') %>"
 });
 }, 300);

 }
 */


var getDataForChart=function () {
    let selector = {};
    selector.year = stateSelectorChart.get('yearSelect');
    selector.currencyId = stateSelectorChart.get('currency');
    let accountTypeId= stateSelectorChart.get('accountType');

    Meteor.call("chart_accountEveryMonthCombination", selector,accountTypeId, function (err, obj) {
        if(obj!= undefined){
            Session.set("obj",obj);
        }
    })
}