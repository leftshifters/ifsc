var _ = require('underscore');

class InMemory {
  constructor(branches) {
    this.branches = branches;
  }

  search(query) {
    query = query.toUpperCase()
    // Split query into multiple words, and we will do an AND
    let items = query.split(" ");

    return _.filter(this.branches, function(branch) {
      let found = true;
      for (let x in items) {
        if (branch.searchString.includes(items[x]) == false) {
          found = false
          break
        }
      }
      return found
    })
  }
}


module.exports = InMemory;
// turn the query term to all caps
