import DS from 'ember-data';

export default DS.Model.extend({

  items: DS.attr(),
  type: DS.attr('string'),
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
  issued: DS.attr(),
  raw: DS.attr('string')
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
