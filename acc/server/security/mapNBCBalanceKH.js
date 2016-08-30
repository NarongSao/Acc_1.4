import {MapNBCBalanceKH} from '../../imports/api/collections/mapNBCBalanceKH';
import './_init.js';
/**
 * chart of Account
 */

MapNBCBalanceKH.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapNBCBalanceKH.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapNBCBalanceKH.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
