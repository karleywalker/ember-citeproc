import Ember from 'ember';
/* global CSL */

export default Ember.Component.extend({
  makeCitations: function(data){
     var citationData = JSON.parse(data);
     var chosenStyleID = "apa-old-doi-prefix";
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
  isWebpage: false,
  isDataset: false,
  isManuscript: false,
  isPresentation: false,
  content: [ "webpage", "dataset", "presentation", "article-journal", "paper-conference", "thesis", "book", "manuscript"],
  isOpened: false,
  isClicked: true,
  advancedIcon: 'fa fa-angle-down',

  actions: {
      updatesCitations: function() {
        var submitted = this.get('model');
        var authorObj = [];
        var i;
        var authors = $('.authorRow').length;
        for (i = 0; i < authors; i++) {
          var givenValue = ($('.authorRow')[i]).children[0].children[0].value;
          var middleInitialValue = ($('.authorRow')[i]).children[1].children[0].value;
          var familyValue = ($('.authorRow')[i]).children[2].children[0].value;
          var authorArray = {
            "family" : familyValue ,
            "given" : givenValue + " " + middleInitialValue
          };
          authorObj.push(authorArray);
        }
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
              "medium": submitted.medium,
              "version": submitted.version,
            }
          ]
        };
        var newCite = JSON.stringify(json);
        this.makeCitations(newCite);
        if ($(".downloadCite")[0]){
           document.getElementById('downloadButton').removeChild(document.getElementById("innerDownloadButton"));
        }
          var a = document.getElementById('downloadButton').appendChild(document.createElement("a"));
          a.className = "btn btn-default pull-right downloadCite";
          a.id = "innerDownloadButton";
          a.download = "citation.xml";
          a.href = "data:text/xml," + document.getElementById("csl-content-block").innerHTML;
          a.innerHTML = "Download as XML";
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
        this.set('submitted.middleInitial', '');
        this.set('submitted.given', '');
        this.set('submitted.location', '');
        this.set('submitted.year', '');
        this.set('submitted.publisher', '');
        this.set('submitted.editor', '');
        this.set('submitted.DOI', '');
        this.set('submitted.journalAbbr', '');
        this.set('submitted.archive', '');
        this.set('submitted.archiveLocation', '');
        this.set('submitted.libraryCatalog', '');
        this.set('submitted.source', '');
        this.set('submitted.callNumber', '');
        this.set('submitted.collectionNumber', '');
        this.set('submitted.collectionEditor', '');
        this.set('submitted.collectionTitle', '');
        this.set('submitted.reviewedAuthor', '');
        this.set('submitted.translator', '');
        this.set('submitted.abstract', '');
        this.set('submitted.genre', '');
        this.set('submitted.conferenceName', '');
        this.set('submitted.issn', '');
        this.set('submitted.isbn', '');
        this.set('submitted.numberOfPages', '');
        this.set('submitted.numberOfVolumes', '');
        this.set('submitted.medium', '');
        this.set('submitted.version', '');
        this.set('submitted.edition', '');
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
        this.set("isWebpage", false);
        this.set("isDataset", false);
        this.set("isPresentation", false);
        this.set("isManuscript", false);
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
        } else if (selected === "dataset") {
          this.set('isDataset', true);
        } else if (selected === "webpage") {
          this.set('isWebpage', true);
        }  else if (selected === "manuscript") {
          this.set('isManuscript', true);
        } else if (selected === "presentation") {
          this.set('isPresentation', true);
        }
      },
      addAuthor(){
        $('.authorRow').first().clone().appendTo('.parentAuthorRow');
        this.set('submitted.family', '');
        this.set('submitted.middleInitial', '');
        this.set('submitted.given', '');
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
              "given" : submitted.given + " " + submitted.middleInitial,
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
              "medium": submitted.medium,
              "version": submitted.version,
        };
        this.sendAction('saveToModel', jsonBlob);
      }
  }
});
