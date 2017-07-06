import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
        return {};
  },
  actions: {
    saveToModel(s){
      this.set('model' , s);
      return s;
    }
  }
});
