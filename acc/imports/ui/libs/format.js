import {Currency} from '../../api/collections/currency';
import {ChartAccount} from '../../api/collections/chartAccount';

import '../../../client/subscription/subscriptionGlobal';


Template.registerHelper('formatMoney', function (val) {
        return numeral(val).format('(0,0.00)');

});

Template.registerHelper('formatMoneyABS', function (val) {
    return numeral(Math.abs(val)).format('(0,0.00)');
});
Template.registerHelper('formatPercentage', function (val) {
    return numeral(val / 100).format('0%');
});

Template.registerHelper('formatMoneyNormal', function (val) {
    if (val != "title") {
            return numeral(val).format('(0,0.00)');
    } else {
        return "";
    }
});

Template.registerHelper('formatDate', function (val) {
    return moment(val).format("DD/MM/YYYY");
});

Template.registerHelper('getChartAccount', function (id) {
    let account = ChartAccount.findOne({_id: id});
    if (account) {
        return account.name;
    }
});
Template.registerHelper('getCurrency', function (id) {
    let currency = Currency.findOne({_id: id});
    if (currency) {
        return currency.symbol;
    }

});
Template.registerHelper('isNegative', function (val) {
    return val < 0;
});
Template.registerHelper('substrVoucher', function (val) {
    return val.substr(8, val.length);
});