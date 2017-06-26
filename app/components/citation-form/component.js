import Ember from 'ember';

export default Ember.Component.extend({
  prompt: true,
  content: [ "Article", "Journal", "Book"],
  optionValuePath: 'value',
  optionLabelPath: 'label',
  isOpened: true,
  actions: {
      formExtend() {
        this.toggleProperty('isOpened');
      }
    }

});
