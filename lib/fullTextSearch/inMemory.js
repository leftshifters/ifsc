const _ = require('underscore');
const debug = require('debug')('ifsc:lib:fullTextSearch:inMemory');

class InMemory {
  constructor(branches) {
    this.branches = branches;
  }

  search(query) {
    if (!!this.branches) {
      console.error('No data has been parsed!!');
      let err = new Error('SERVER_ERROR');
      return err;
    }

    // turn the query term to all caps
    debug('in the inMemory module')
    query = query.toUpperCase();
    // Split query into multiple words, and we will do an AND
    let items = query.split(" ");
    return _.filter(this.branches, function(branch) {
      let found = true;
      for (let x of items) {
        if (branch.searchString.includes(x) == false) {
          found = false;
          break;
        }
      }
      return found;
    });
  }
}

module.exports = InMemory;
