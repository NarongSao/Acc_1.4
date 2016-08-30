
import 'meteor/theara:collection-cache';

// Collection
import {MapFixAsset} from '../../imports/api/collections/mapFixAsset';


MapFixAsset.cacheTimestamp();


MapFixAsset._ensureIndex({fixAsset: 1,accuFixAsset: 1,fixAssetExpense: 1}, {unique: 1});
