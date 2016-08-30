/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Acc.Collection.JournalSetting = new Mongo.Collection("accJournalSetting");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Acc.Schema.JournalSetting = new SimpleSchema({
    name: {
        type: Number,
        unique: true,
        max: 200
    }
});

/**
 * Attach schema
 */
Acc.Collection.JournalSetting.attachSchema(Acc.Schema.JournalSetting);
