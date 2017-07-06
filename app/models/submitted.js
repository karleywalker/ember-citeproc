import DS from 'ember-data';

export default DS.Model.extend({
  items: DS.attr(),
  type: DS.attr(),
  title: DS.attr('string'),
  containerTitle: DS.attr('string'),
  page: DS.attr('string'),
  volume: DS.attr('string'),
  issue: DS.attr('string'),
  URL: DS.attr('string'),
  shortTitle: DS.attr('string'),
  author: DS.attr(),
  family: DS.attr('string'),
  given: DS.attr('string'),
  middleInitial: DS.attr('string'),
  issued: DS.attr(),
  raw: DS.attr('string'),
  accessed: DS.attr(),
  raw: DS.attr('string'),
  archiveLocation: DS.attr('string'),
  archive: DS.attr('string'),
  publisher: DS.attr('string'),
  editor: DS.attr('string'),
  journalAbbr: DS.attr('string'),
  collectionTitle: DS.attr('string'),
  source: DS.attr('string'),
  callNumber: DS.attr('string'),
  issn: DS.attr('string'),
  reviewedAuthor: DS.attr('string'),
  translator: DS.attr('string'),
  abstract: DS.attr('string'),
  DOI: DS.attr('string')
});

// export default DS.JSONSerializer.extend({
//   serialize(snapshot, options) {
//     var json = {
//       givenName: snapshot.attr('string'),
//       middleInitial: snapshot.attr('string'),
//       familyName: snapshot.hasMany('string', { ids: true })
//     };
//
//     if (options.includeId) {
//       json.POST_ID_ = snapshot.id;
//     }
//
//     return json;
//   }
// });
