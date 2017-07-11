import Ember from 'ember';
/* global CSL */

export default Ember.Component.extend({
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

  isBook: false,
  isArticleJournal: false,
  isPaperConference: false,
  isThesis: false,
  content: [ "article-journal", "paper-conference", "thesis", "book"],
  isOpened: false,
  isClicked: true,
  advancedIcon: 'fa fa-angle-down',

  actions: {
      updatesCitations: function() {
        var submitted = this.get('model');
        var authorObj = [];
        var i;
        var k;
        var authors = $('.authorRow').length;
        for (i = 0; i < authors; i++) {
          var familyValue = ($('.authorRow')[i]).children[0].children[0].value;
          var givenValue = ($('.authorRow')[i]).children[2].children[0].value;
          var authorArray = {
            "family" : familyValue,
            "given" : givenValue
          };
          authorObj.push(authorArray);
        };
        console.log("authorObj", authorObj);
        var json = {
          "items": [
            {
              "type" : submitted.type,
              "title" : submitted.title,
              "container-title" : submitted.containerTitle ,
              "page": submitted.page,
              "volume": submitted.volume,
              "issue": submitted.issue,
              "URL": submitted.URL,
              "DOI": submitted.DOI,
              "issued": {
                "raw": submitted.issued
              },
              "accessed": {
                "raw": submitted.accessed
              },
              "author" : authorObj ,
              "publisher" : submitted.publisher,
              "editor" : submitted.editor,
              "container-title-short" : submitted.journalAbbr,
              "archive_location" : submitted.archiveLocation,
              "archive" : submitted.archive,
              "source": submitted.libraryCatalog,
              "title-short": submitted.shortTitle,
              "location" : submitted.location,
              "call-number": submitted.callNumber,
              "collection-title": submitted.collectionTitle,
              "ISSN": submitted.issn,
              "reviewed-author": submitted.reviewedAuthor,
              "translator": submitted.translator,
              "abstract": submitted.abstract,
              "ISBN": submitted.isbn,
              "collection-editor": submitted.collectionEditor,
              "publisher-place": submitted.location,
              "event-place": submitted.location,
              "number-of-pages": submitted.numberOfPages,
              "number-of-volumes": submitted.numberOfVolumes,
              "edition": submitted.edition,
              "collection-number": submitted.collectionNumber,
              "event": submitted.conferenceName,
              "genre": submitted.genre,
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
      formClear() {
        this.set('submitted.title', '');
        this.set('submitted.type', '');
        this.set('submitted.containerTitle', '');
        this.set('submitted.page', '');
        this.set('submitted.volume', '');
        this.set('submitted.issue', '');
        this.set('submitted.URL', '');
        this.set('submitted.shortTitle', '');
        this.set('submitted.issued', '');
        this.set('submitted.accessed', '');
        this.set('submitted.family', '');
        this.set('submitted.given', '');
        this.set('submitted.location', '');
        this.set('submitted.year', '');
        this.set('submitted.publisher', '');
        this.set('submitted.editor', '');
        this.set('submitted.DOI', '');
        this.set('submitted.journalAbbr', '');
        this.set('submitted.archive', '');
        this.set('submitted.archiveLocation', '');
        this.set('isClicked', false);
      },
      changeClass: function() {
        if (this.get('advancedIcon') === 'fa fa-angle-down'){
          this.set('advancedIcon', 'fa fa-angle-up');
        } else {
          this.set('advancedIcon', 'fa fa-angle-down');
        }
      },
      setFalse(){
        this.set("isBook", false);
        this.set("isArticleJournal", false);
        this.set("isPaperConference", false);
        this.set("isThesis", false);
      },
      typeSelected: function(selected){
        this.send("setFalse");
        if (selected === "book"){
          this.set('isBook' , true );
        } else if (selected === "article-journal") {
          this.set('isArticleJournal', true);
        } else if (selected === "paper-conference") {
          this.set('isPaperConference', true);
        } else if (selected === "thesis") {
          this.set('isThesis', true);
        }
      },
      addAuthor(){
        $('.authorRow').first().clone().appendTo('.parentAuthorRow');
        this.set('submitted.family', '');
        this.set('submitted.given', '');
        this.set('submitted.middleInitial', '');
      },
      submit: function() {
        var submitted = this.get('model');
        var jsonBlob = {
              "title" : submitted.title,
              "type" : submitted.type,
              "container-title" : submitted.containerTitle ,
              "page": submitted.page,
              "volume": submitted.volume,
              "issue": submitted.issue,
              "URL": submitted.URL,
              "issued": submitted.issued,
              "issued": submitted.accessed,
              "family" : submitted.family ,
              "given" : submitted.given,
              "DOI" : submitted.DOI,
              "publisher" : submitted.publisher,
              "editor" : submitted.editor,
              "container-title-short" : submitted.journalAbbr,
              "archive_location" : submitted.archiveLocation,
              "archive" : submitted.archive,
              "source": submitted.libraryCatalog,
              "title-short": submitted.shortTitle,
              "location" : submitted.location,
              "call-number": submitted.callNumber,
              "collection-title": submitted.collectionTitle,
              "ISSN": submitted.issn,
              "reviewed-author": submitted.reviewedAuthor,
              "translator": submitted.translator,
              "abstract": submitted.abstract,
              "ISBN": submitted.isbn,
              "collection-editor": submitted.collectionEditor,
              "publisher-place": submitted.location,
              "event-place": submitted.location,
              "number-of-pages": submitted.numberOfPages,
              "number-of-volumes": submitted.numberOfVolumes,
              "edition": submitted.edition,
              "collection-number": submitted.collectionNumber,
              "event": submitted.conferenceName,
              "genre": submitted.genre,
        };
        this.sendAction('saveToModel', jsonBlob);
      }
  }
});
