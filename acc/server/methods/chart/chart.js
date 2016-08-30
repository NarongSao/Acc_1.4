import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {NetInCome} from '../../../imports/api/collections/netIncome';
import {CloseChartAccount} from '../../../imports/api/collections/closeChartAccount';
import {ChartAccount} from '../../../imports/api/collections/chartAccount';

Meteor.methods({
    chart_netIncome(param){
        var currentDate = new Date();

        var data = {};
        /* var startDate = moment(moment(selector.year + "-01-01").toDate()).format("YYYY-MM-DD");
         var endDate = moment(moment(selector.year + "-12-31").add('days', 1).toDate()).format("YYYY-MM-DD");*/

        var selector = {};
        selector.year = param.year;
        var netIncome = NetInCome.find(selector).fetch();
        data = {
            labels: [],
            datasets: [{
                label: "My Dollar",
                fillColor: "teal",
                strokeColor: "teal",
                pointColor: "#ffff00",
                pointStrokeColor: "#e65100",
                pointHighlightFill: "#e65100",
                pointHighlightStroke: "#e65100",
                data: []
            }]
        };
        var arr = [];
        if (netIncome.length > 0) {

            netIncome.forEach((obj)=> {
                var month = moment(obj.date).format("MM");
                month = parseInt(month);
                if (param.currency == "usd") {
                    data.labels.push(getMonthName(month));
                    arr.push(obj.dollar);
                } else if (param.currency == "khr") {
                    data.labels.push(getMonthName(month));
                    arr.push(obj.riel);
                } else if (param.currency == "baht") {
                    data.labels.push(getMonthName(month));
                    arr.push(obj.baht);
                }
            });
        }


        data.datasets[0].data = arr;

        return data;

    },
    chart_profitLostComparation(param){
        let currentDate = new Date();
        let data = {
            labels: [],
            datasets: []
        };

        param.accountTypeId = {$in: ["40", "41", "50", "51"]};
        let accountList = ChartAccount.find({accountTypeId: {$in: ["40", "41", "50", "51"]}}).fetch();

        let configDataset = {
            label: "My Dollar",
            fillColor: "teal",
            strokeColor: "teal",
            pointColor: "#ffff00",
            pointStrokeColor: "#e65100",
            pointHighlightFill: "#e65100",
            pointHighlightStroke: "#e65100",
            data: []
        };
        let a = 0;
        for (let i = 1; i < 13; i++) {
            param.month = s.pad(i, 2, "0");
          
            var doc = CloseChartAccount.find(param).fetch();
            if (doc.length > 0) {
                accountList.forEach(function (ob) {
                    if (a == 0) {
                        data.labels.push(ob.code + " | " + ob.name);
                    }

                    let result = doc.find(obj=> obj.closeChartAccountId === ob._id);
                    console.log(result);
                    if (result!=undefined) {
                        configDataset.data.push(result.value);
                    } else {
                        configDataset.data.push(0);
                    }
                })
                data.datasets.push(configDataset);
            }
            a++;
        }
        return data;
    }
});

let getMonthName = (number) => {
    let month = '';
    switch (number) {
        case 1:
            month = 'មករា'
            break;
        case 2:
            month = 'កុម្ភៈ​'
            break;
        case 3:
            month = 'មិនា'
            break;
        case 4:
            month = 'មេសា'
            break;
        case 5:
            month = 'ឧសភា'
            break;
        case 6:
            month = 'មិថុនា'
            break;
        case 7:
            month = 'កក្កដា'
            break;
        case 8:
            month = 'សីហា'
            break;
        case 9:
            month = 'កញ្ញា'
            break;
        case 10:
            month = 'តុលា'
            break;
        case 11:
            month = 'វិច្ឆិកា'
            break;
        case 12:
            month = 'ធ្នូ'
            break;

    }
    return month;
}