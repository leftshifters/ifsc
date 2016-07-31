var Branch = require('./branch')
var _ = require("underscore")
var InMemory  = require('../lib/fullTextSearch/inMemory');

class Branches {

  constructor(options) {
    this.branches = []
  }

  add(branch) {
    // Only add if the bank has a name
    if (branch.bank) {
      this.branches.push(branch)
    }
  }

  find(query, method) {
    // If empty return
    if (query == "") {
      return []
    }

    // TODO : Add proper error handling
    // Remove white spaces
    // method = method.replace(/\s+/g, '');

    // Based on the method defined, call the appropriate full text library
    switch (method) {
      case undefined:
      case '':
      case 'filter':
        var filter = new InMemory(this.branches);
        return filter.search(query);

      default:
        // TODO : return error that we could not understand
    }
  }
}

module.exports = Branches
