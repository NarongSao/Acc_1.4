import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {ExchangeNBC} from '../../imports/api/collections/exchangeNBC.js';

/**
 * Exchange
 */
var module = 'Acc';

ExchangeNBC.after.insert(function (userId, doc) {
    Events.trackInsert({
        description: doc,
        module: module
    });
});

ExchangeNBC.after.update(function (userId, doc, fieldNames, modifier, options) {
    Events.trackUpdate({
        description: modifier,
        module: module
    });
});

ExchangeNBC.after.remove(function (userId, doc) {
    Events.trackRemove({
        description: doc,
        module: module
    });
});