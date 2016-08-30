import {ConfigDep} from '../../imports/api/collections/configDep';
import './_init.js';
/**
 * Journal
 */

ConfigDep.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
ConfigDep.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
ConfigDep.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
