import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),

  // prompt: true,
  // content: [ "Article", "Journal", "Book"],
  // optionValuePath: 'value',
  // optionLabelPath: 'label',
  isOpened: true,
  actions: {
      formExtend() {
        this.toggleProperty('isOpened');
      },
      submit: function(submitted) {
        var jsonBlob = {
              "id" : submitted.id,
              "type" : submitted.type,
              "title" : submitted.title,
              "containerTitle" : submitted.containerTitle ,
              "page": submitted.page,
              "volume": submitted.volume,
              "issue": submitted.issue,
              "URL": submitted.URL,
              "shortTitle": submitted.shortTitle,
              "raw": submitted.raw,
              "family" : submitted.family ,
              "given" : submitted.given,
        };
        this.sendAction('saveToModel', jsonBlob);
      }
    }
});
