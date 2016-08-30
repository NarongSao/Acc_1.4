import {FixAssetExpense} from '../../imports/api/collections/fixAssetExpense';
import './_init.js';
/**
 * Journal
 */

FixAssetExpense.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
FixAssetExpense.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
FixAssetExpense.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
