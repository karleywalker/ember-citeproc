import Ember from 'ember';
/* global CSL */

export default Ember.Component.extend({

  store: Ember.inject.service(),

  makeCitations: function(data){
     var citationData = JSON.parse(data);
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
       }

       function processorOutput() {
         var citeproc = getProcessor(chosenStyleID);
         citeproc.updateItems(itemIDs);
         var bibResult = citeproc.makeBibliography();
         return bibResult[1].join('\n');
       }

       var content = document.getElementById("csl-content-block");
       content.innerHTML = processorOutput();
   },

  init() {
    this._super(...arguments);
  },
  // didRender(){
  //   this._super(...arguments);
  //   var newCite = "";
  //   var that = this;
  //
  //   $.get("sample.json", function(json){
  //       newCite = json;
  //       that.makeCitations(JSON.stringify(newCite));
  //   });
  // },

  prompt: true,
  content: [ "Article", "Journal", "Book"],
  optionValuePath: 'value',
  optionLabelPath: 'label',
  isOpened: true,
  isClicked: false,

  actions: {
      updatesCitations: function() {
        var submitted = this.get('model');
        var json = {
          "items": [
            {
              "id" : submitted.id,
              "type" : submitted.type,
              "title" : submitted.title,
              "containerTitle" : submitted.containerTitle ,
              "page": submitted.page,
              "volume": submitted.volume,
              "issue": submitted.issue,
              "URL": submitted.URL,
              "shortTitle": submitted.shortTitle,
              "issued": {
                "raw": submitted.raw
              },
              "author" : [
                {
                  "family" : submitted.family ,
                  "given" : submitted.given
                }
              ]
            }
          ]
        };
        var newCite = JSON.stringify(json);
        this.makeCitations(newCite);
      },
      formExtend() {
        this.toggleProperty('isOpened');
      },
      formShow() {
        this.set('isClicked', true);

      },
      formHide() {
        //this.set('isClicked', false);
      },
      formClear() {
        //$("#myform").trigger("reset");

       this.get('submitted').rollbackAttributes()
        //this.set('submitted.id', '');
        this.set('isClicked', false);
        //setTimeout(() => {this.set('isClicked', false)}, 1000);

        // ($('#myform').trigger('reset')).then(
        //   function() {
        //     this.set('isClicked', false);
        //     console.log("hey");
        //   }
        // );
        // var self = this;
        // $("#myform").bind("reset", function(e, callback) {
        //             callback();
        //         });
        //         let callback = function() {
        //             self.set('isClicked', false);
        //         }
        //
        //         $("#myform").trigger("reset", [callback]);
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
