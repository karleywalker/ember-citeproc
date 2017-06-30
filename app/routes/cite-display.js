import Ember from 'ember';
import DS from 'ember-data';


export default Ember.Route.extend({
  store: Ember.inject.service(),
  model: function () {
        return this.get('store').createRecord('submitted');
  },
  actions: {
    saveToModel(s){
      this.set('model' , s);
      console.log(s);
      return s;
    }
  }
});
