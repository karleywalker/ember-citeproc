# Citation Widget

An Ember widgets that populates citations with a form using citeproc-js.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) [ only needed for testing ]

## Installation

* `git clone https://github.com/karleywalker/ember-citeproc.git`
* `cd ember-citeproc`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Incomplete and Unimplemented aspects of this project
### Unfinished Schema
  * Authors :
    * Suffix
    * Comma-suffix
    * Static-ordering
    * parse-names
    * Prefix
    * non-dropping-particle
    * dropping-particle
    * Literal

  * Date-field types
    * Archived
    * Original
    * Container
    * Event-date
    * submitted
  
  
###  Unimplemented / Future Features
  * Reorder Authors
  * More types - currently have [ webpage, dataset, book, thesis, presentation, conference, article-journal ]
  * “Extra” fields
  * Dealing with non-english languages 
  * WYSIWIG Editing
