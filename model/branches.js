const Branch = require('./branch');
const _ = require("underscore");
const InMemory  = require('../lib/fullTextSearch/inMemory');
const Database = require('./databaseStorage');

class Branches {

  constructor(options) {
    this.branches = [];
    this.database = new Database();

  }

  add(branch) {
    // Only add if the bank has a name
    if (branch.bank) {
      this.branches.push(branch);
    }
  }

  find(query, method) {
    // If empty return
    if (query == "") {
      return [];
    }

    // Remove white spaces
    method = method.replace(/\s+/g, '');
    // TODO : Add proper error handling

    // Based on the method defined, call the appropriate full text library
    switch (method) {
      case undefined:
      case '':
      case 'inmemory':
        const inMemory = new InMemory(this.branches);
        return inMemory.search(query);
      case 'db':
            return this.database.search(query);
      default:
        // TODO : return error that we could not understand
        let err = new Error('undefined method call.');
        return(err);
    }
  }
}

module.exports = Branches;
