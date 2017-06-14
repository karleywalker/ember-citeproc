import Ember from 'ember';
/* global citeproc */

export default Ember.Component.extend({
  makeCitations: function(citationData){
     var chosenStyleID = "chicago-fullnote-bibliography";
     var citations = {};
     var itemIDs = [];

     for (var i=0,ilen=citationData.items.length;i<ilen;i++) {
       var item = citationData.items[i];
       if (!item.issued) continue;
       if (item.URL) delete item.URL;
       var id = item.id;
       citations[id] = item;
       itemIDs.push(id);
     }

     var citeprocSys = {
         retrieveLocale: function (lang){
           var xhr = new XMLHttpRequest();
           xhr.open('GET', 'https://raw.githubusercontent.com/Juris-M/citeproc-js-docs/master/locales-' + lang + '.xml', false);
           xhr.send(null);
           return xhr.responseText;
         },
         retrieveItem: function(id){
           return citations[id];
         }
       };

       function getProcessor(styleID) {
         var xhr = new XMLHttpRequest();
         xhr.open('GET', 'https://raw.githubusercontent.com/citation-style-language/styles/master/' + styleID + '.csl', false);
         xhr.send(null);
         var styleAsText = xhr.responseText;
         var citeproc = new CSL.Engine(citeprocSys, styleAsText);
         return citeproc;
       };

       function processorOutput() {
         var citeproc = getProcessor(chosenStyleID);
         citeproc.updateItems(itemIDs);
         var bibResult = citeproc.makeBibliography();
         return bibResult[1].join('\n');
       };

       var content = document.getElementById("csl-content-block");
       content.innerHTML = processorOutput();
   },

  didRender(){
    this._super(...arguments);
    var newCite = document.getElementById("json-text").value;
    var data = JSON.parse(newCite);
    this.makeCitations(data);
  },

  actions: {
      updatesCitations: function() {
        var newCite = document.getElementById("json-text").value;
        var data = JSON.parse(newCite);
        this.makeCitations(data);
      }
  }
});
