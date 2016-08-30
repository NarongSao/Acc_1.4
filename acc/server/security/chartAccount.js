
import {ChartAccount} from '../../imports/api/collections/chartAccount';
import './_init.js';
/**
 * chart of Account
 */

ChartAccount.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
ChartAccount.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
ChartAccount.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
