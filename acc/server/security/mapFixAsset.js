
import {MapFixAsset} from '../../imports/api/collections/mapFixAsset';
import './_init.js';
/**
 * chart of Account
 */

MapFixAsset.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapFixAsset.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapFixAsset.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
