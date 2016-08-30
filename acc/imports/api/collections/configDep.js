
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

import {SelectOpts} from '../../ui/libs/select-opts';

/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
export const ConfigDep = new Mongo.Collection("accConfigDep");
/**
 * Schema
 *
 * @type {AccSchema}
 */
ConfigDep.schema = new SimpleSchema({


  depPerTime: {
    type: Number,
    label: "Dep PerTime"
  },
  depType: {
    type: String,
    label: "Depreciation Type",
    autoform: {
      type: "select2",
      options: function () {
        return SelectOpts.depType();
      }
    }

  }
});
/**
 * Attach schema
 */

Meteor.startup(function () {
  ConfigDep.schema.i18n("acc.configDep.schema");
  ConfigDep.attachSchema(ConfigDep.schema);
});

