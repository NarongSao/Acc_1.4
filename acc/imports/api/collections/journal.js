import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';
import {SelectOpts} from '../../ui/libs/select-opts';

export const Journal = new Mongo.Collection('accJournal');
/*
 Schema
 */
Journal.schema = new SimpleSchema({
    journalDate: {
        type: Date,
        label: "Journal Date",
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    voucherId: {
        type: String,
        label: "Voucher"

        /*    unique: true,*/
        /* custom: function () {
         if (this.isInsert) {
         var data = Acc.Collection.Journal.find({
         voucherId: this.value
         });
         if (data.count() > 0) {
         return "uniqueVoucher";
         }
         }
         }*/
    },
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.currency(false);
            }
        },
        defaultValue: "USD"
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    memo: {
        type: String,
        label: "Description",
        autoform: {
            type: "textarea"
        }
    },
    splitAccount: {
        type: String,
        label: "splitAccount",
        optional: true
    },
    /* transaction: {
     type: [Journal.journalDetal],
     minCount: 1,
     optional: true
     }*/
    transaction: {
        type: [Object],
        minCount: 1,
        optional: true
    },
    'transaction.$': {
        type: Object
    },
    'transaction.$.account': {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account",
        autoform: {
            type: "select2",
            placeholder: "Chart Of Account",
            options: function () {
                return SelectOpts.chartAccount();
            }
        }
    }
    ,
    'transaction.$.dr': {
        type: Number,
        decimal: true,
        optional: true,
        label: "Debit",
        autoform: {
            type: 'inputmask',
            placeholder: "Debit",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }
    ,
    'transaction.$.cr': {
        type: Number,
        decimal: true,
        optional: true,
        label: "Credit",
        autoform: {
            type: 'inputmask',
            placeholder: "Credit",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }
    ,
    'transaction.$.drcr': {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }

    ,

    total: {
        type: Number,
        decimal: true,
        label: "Total",
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }
    ,
    endId: {
        type: String,
        optional: true,
        defaultValue: "0"
    }
    ,
    fixAssetExpenseId: {
        type: String,
        optional: true,
        defaultValue: "0"
    }
    ,
    closingId: {
        type: String,
        optional: true,
        defaultValue: "0"
    }
    /* ,
     transactionAsset: {
     type: [Journal.fixAssetSchema],
     optional: true
     } */,
    transactionAsset: {
        type: [Object],
        optional: true
    },
    'transactionAsset.$': {
        type: Object
    },
    'transactionAsset.$.account': {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account",
        autoform: {
            type: "select2",
            placeholder: "Chart Of Account",
            allowClear: true,
            options: function () {
                return SelectOpts.fixAssetChatAccount();
            }
        }
    },
    'transactionAsset.$.value': {
        type: Number,
        decimal: true,
        label: "Value",
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Value",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }, 'transactionAsset.$.life': {
        type: Number,
        optional: true,
        label: "Life (Year)",
        autoform: {
            type: 'inputmask',
            placeholder: "Life(Year)",

            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    'transactionAsset.$.estSalvage': {
        type: Number,
        optional: true,
        label: "Estimate Salvage",

        autoform: {
            type: 'inputmask',
            placeholder: "Estimate Salvage",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    'transactionAsset.$.code': {
        type: String,
        label: "Code",
        optional: true,
        autoform: {
            placeholder: "Code"
        }
    },
    'transactionAsset.$.percent': {
        type: Number,
        label: "Percentage",
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Percentage",
            inputmaskOptions: function () {
                return inputmaskOptions.percentage();
            }
        }
    },
    'transactionAsset.$.description': {
        label: "Description",
        type: String,
        optional: true,
        autoform: {
            placeholder: "Description",
        }
    },
    refId: {
        type: String,
        optional: true
    },
    refFrom: {
        type: String,
        optional: true
    }


    /*createdAt: {
     type: Date,
     label: "Create Date",
     autoValue: function () {
     if (this.isInsert) {
     return new Date();
     }
     },
     denyUpdate: true
     },
     updatedAt: {
     type: Date,
     label: "Updated Date",
     autoValue: function () {
     return new Date();
     }
     },
     createdUserId: {
     type: String,
     max: 200,
     label: "Created UserId",
     autoValue: function () {
     if (this.isInsert) {
     return Meteor.user()._id;
     }
     },
     denyUpdate: true
     },
     updatedUserId: {
     type: String,
     max: 200,
     label: "Updated UserId",
     autoValue: function () {
     return Meteor.user()._id;
     }
     }*/

});


SimpleSchema.messages({
    "uniqueVoucher": "Voucher must be unique."
})


//Sub
Journal.journalDetal = new SimpleSchema({
    account: {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account",
        autoform: {
            type: "select2",
            placeholder: "Chart Of Account",
            options: function () {
                return SelectOpts.chartAccount();
            }
        }
    },
    dr: {
        type: Number,
        decimal: true,
        optional: true,
        label: "Debit",
        autoform: {
            type: 'inputmask',
            placeholder: "Debit",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    cr: {
        type: Number,
        decimal: true,
        optional: true,
        label: "Credit",
        autoform: {
            type: 'inputmask',
            placeholder: "Credit",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    drcr: {
        type: Number,
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }
});

//Sub
Journal.fixAssetSchema = new SimpleSchema({
    account: {
        type: String,
        max: 200,
        optional: true,
        label: "Chart Of Account",
        autoform: {
            type: "select2",
            placeholder: "Chart Of Account",
            allowClear: true,
            options: function () {
                return SelectOpts.fixAssetChatAccount();
            }
        }
    },
    value: {
        type: Number,
        decimal: true,
        label: "Value",
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Value",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    }, life: {
        type: Number,
        optional: true,
        label: "Life (Year)",
        autoform: {
            type: 'inputmask',
            placeholder: "Life(Year)",

            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    estSalvage: {
        type: Number,
        optional: true,
        label: "Estimate Salvage",

        autoform: {
            type: 'inputmask',
            placeholder: "Estimate Salvage",
            inputmaskOptions: function () {
                return inputmaskOptions.decimal();
            }
        }
    },
    code: {
        type: String,
        label: "Code",
        optional: true,
        autoform: {
            placeholder: "Code"
        }
    },
    percent: {
        type: Number,
        label: "Percentage",
        decimal: true,
        optional: true,
        autoform: {
            type: 'inputmask',
            placeholder: "Percentage",
            inputmaskOptions: function () {
                return inputmaskOptions.percentage();
            }
        }
    },
    description: {
        label: "Description",
        type: String,
        optional: true,
        autoform: {
            placeholder: "Description",
        }
    }
});

Meteor.startup(function () {
    Journal.fixAssetSchema.i18n("acc.journal.schema");
    Journal.journalDetal.i18n("acc.journal.schema");
    Journal.schema.i18n("acc.journal.schema");
    Journal.attachSchema(Journal.schema);
});

