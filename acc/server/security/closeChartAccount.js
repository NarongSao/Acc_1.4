import {CloseChartAccount} from '../../imports/api/collections/closeChartAccount';
import './_init.js';
/**
 * CloseChartAccount
 */

CloseChartAccount.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
CloseChartAccount.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
CloseChartAccount.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
