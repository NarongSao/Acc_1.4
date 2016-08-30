import {MapNBCBalance} from '../../imports/api/collections/mapNBCBalance';
import './_init.js';
/**
 * chart of Account
 */

MapNBCBalance.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapNBCBalance.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapNBCBalance.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
