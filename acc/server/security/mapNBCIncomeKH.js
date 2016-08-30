import {MapNBCIncomeKH} from '../../imports/api/collections/mapNBCIncomeKH';
import './_init.js';
/**
 * chart of Account
 */

MapNBCIncomeKH.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapNBCIncomeKH.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapNBCIncomeKH.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();

