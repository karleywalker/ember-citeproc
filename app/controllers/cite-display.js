import Ember from 'ember';

export default Ember.Controller.extend({
  isClicked: true,
  actions: {
      formShow() {
        this.toggleProperty('isClicked');
      }
    }
    // attributeBindings: ['style'],
    // expanded: false,
    // init() {
    //   this._super(...arguments);
    //   this.incrementProperty('count');
    // },
    // style: Em.computed('expanded', function() {
    //   if(this.get('expanded')) {
    //     return `background-color: lightgreen`.htmlSafe();
    //   } else {
    //     return `background-color: yellow`.htmlSafe();
    //   }
    // }),
    //
    // count: 0,
    //
    // actions: {
    //   toggle() {
    //     this.incrementProperty('count');
    //     this.toggleProperty('expanded');
    //   }
    // }
});
