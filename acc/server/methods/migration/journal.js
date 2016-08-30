import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';


// Collection
import {Journal} from '../../../imports/api/collections/journal';

Meteor.methods({
    otherSystem_journalInsert: function (data) {
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

        return Journal.insert(data);
    },
    otherSystem_journalUpdate: function (data, journalId) {
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

        return Journal.update({_id: journalId,refId: data.refId, refFrom: data.refFrom}, {$set: data});
    },

    otherSystem_journalRemove: function (journalId, refId, refFrom) {
        return Journal.remove({_id: journalId, refId: refId, refFrom: refFrom});
    }
});