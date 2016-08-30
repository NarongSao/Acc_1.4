
import {MapClosing} from '../../imports/api/collections/mapCLosing';
import './_init.js';

/**
 * chart of Account
 */

MapClosing.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
MapClosing.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
MapClosing.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
