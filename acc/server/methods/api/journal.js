import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';


// Collection
import {Journal} from '../../../imports/api/collections/journal';

Meteor.methods({
    api_journalInsert: function (data) {
        check(data, Object);
        _.defaults(data, {
            journalDate: moment().format('DD/MM/YYYY'),
            branchId: "",
            voucherId: "",
            currencyId: "",
            memo: "",
            total: 0
        });

        var date = moment(data.journalDate, "DD/MM/YYYY").format("YYMM");
        var prefix = data.branchId + "-" + date;
        data.idGiven = idGenerator.genWithPrefix(Journal,
            prefix, 6);
        var year = moment(data.journalDate, "DD/MM/YYYY").format("YYYY");
        data.voucherId = data.branchId + "-" + year + s.pad(data.voucherId, 6, "0");

        let result=[];
        data.transaction.reduce(function (key, val) {
            if (!key[val.account]) {
                key[val.account] = {
                    account: val.account,
                    dr: val.dr,
                    cr: val.cr,
                    drcr: val.drcr
                };
                result.push(key[val.account]);
            } else {

                key[val.account].dr += val.dr;
                key[val.account].cr += val.cr;
                key[val.account].drcr += val.drcr;

                if(key[val.account].dr> key[val.account].cr){
                    var dr= key[val.account].dr- key[val.account].cr;
                    var cr=0;
                }else{
                    var dr=0;
                    var cr= key[val.account].cr- key[val.account].dr;
                }
                key[val.account].dr = dr;
                key[val.account].cr = cr;

            }
            return key;
        }, {});

        return Journal.insert(data);
    },
    api_journalUpdate: function (data) {
        check(data, Object);
        _.defaults(data, {
            journalDate: moment().format('DD/MM/YYYY'),
            branchId: data.branchId,
            voucherId: "",
            currencyId: "",
            memo: "",
            total: 0
        });


        var date = moment(data.journalDate, "DD/MM/YYYY").format("YYMM");
        var prefix = data.branchId + "-" + date;
        data._id = idGenerator.genWithPrefix(Journal,
            prefix, 6);
        var year = moment(data.journalDate).format("YYYY");
        data.voucherId = data.branchId + "-" + year + s.pad(data.voucherId, 6, "0");

        let result=[];
        data.transaction.reduce(function (key, val) {
            if (!key[val.account]) {
                key[val.account] = {
                    account: val.account,
                    dr: val.dr,
                    cr: val.cr,
                    drcr: val.drcr
                };
                result.push(key[val.account]);
            } else {

                key[val.account].dr += val.dr;
                key[val.account].cr += val.cr;
                key[val.account].drcr += val.drcr;

                if(key[val.account].dr> key[val.account].cr){
                    var dr= key[val.account].dr- key[val.account].cr;
                    var cr=0;
                }else{
                    var dr=0;
                    var cr= key[val.account].cr- key[val.account].dr;
                }
                key[val.account].dr = dr;
                key[val.account].cr = cr;

            }
            return key;
        }, {});

        return Journal.update({refId: data.refId, refFrom: data.refFrom}, {$set: data});
    },

    api_journalRemove: function (refId, refFrom) {
        return Journal.remove({ refId: refId, refFrom: refFrom});
    }
});