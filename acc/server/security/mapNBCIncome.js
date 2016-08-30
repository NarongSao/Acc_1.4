
import {MapNBCIncome} from '../../imports/api/collections/mapNBCIncome';
import './_init.js';
/**
 * chart of Account
 */


MapNBCIncome.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapNBCIncome.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapNBCIncome.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
