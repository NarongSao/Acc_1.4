import '../../../../core/client/components/loading.js';
import {Branch} from '../../../../core/imports/api/collections/branch.js';

Template.registerHelper('getBranch', function (id) {
    var result = "All";
    if (id != "All") {
        var branchName = Branch.findOne(id).enName;
        result = branchName;
    }
    return result;
})
