const Parser = require('./parser');
const Scrapper = require('./scrapper');
const Branches = require('../model/branches');
const fs = require('fs');
const debug = require('debug')('ifsc:lib:store');

class Store {

  constructor(options) {
    this.diskPath = options.diskPath;

    this.p = new Parser();
    this.s = new Scrapper({ scanURL: "https://www.rbi.org.in/scripts/neft.aspx" });
    this.branches = new Branches();
    debug('in the store constructor');
  }

  getStore() {
    return this.branches;
  }

  readLocalStore(cb) {
    this.storeExists((err, stats, exists) => {
      if (!exists) {
        // The file does not exist, start downloading
        return this.downloadDump((err) => {
          if (err) return cb(err, this.branches);
          // Successfully downloaded, parse the file
          this.parseStores(this.diskPath);
          return cb(null, this.branches);
        });
      }

      if (this.staleDump(stats, 15) == true) {
        this.downloadDump((err) => {
          if (err) return cb(err, this.branches);
          return cb(null, this.branches);
        });
      }

      // insert records into the database.
      this.parseStores(this.diskPath);
      this.branches.database.insert(this.branches.branches).then(() => {
        debug('All records inserted Successfully.');
      }).catch(err => {
        console.error(err);
      });


      return cb(null, this.branches);
    });
  }

  storeExists(cb) {
    // Check if file exists
    fs.stat(this.diskPath, (err, stats) => {
      if (err) return cb(err, stats, false);
      return cb(null, stats, true);
    });
  }

  // This is Synchronous
  parseStores() {
    debug("Parsing DataStore - " + this.diskPath);
    let start = process.hrtime();
    this.branches = this.p.parse(this.diskPath);
    debug('time of parsing', process.hrtime(start)[0]+'sec '+process.hrtime(start)[1]/1000000+'ms');
    debug("DataStore has been parsed and is now in memory - " + this.diskPath);
  }

  // Return if Dump is over 15 days old
  staleDump(stats, timeInDays) {
    // Check if it has been over 15 days since the file was downloaded
    let currentTime = new Date().getTime();
    let modifiedTime = stats.mtime.getTime();
    let days = Math.abs(currentTime - modifiedTime) / (1000 * 60 * 60 * 24);
    debug("It has been " + days + " days");

    if (days > timeInDays) {
      // Start downloading the file again
      debug("This looks stale, it has been more than " + timeInDays + " days");
      return true;
    } else {
      debug("This looks fresh, there's still time in " + timeInDays + " days");
    }

    return false;
  }

  downloadDump(cb) {
    this.s.find((err, link) => {
      if (err) {
        return cb(err);
      }
      if (link == "") {
        return cb("Did not find a link to download at https://www.rbi.org.in/scripts/neft.aspx");
      }

      debug("Trying to download link " + link);
      this.s.download(link, this.diskPath, (err) => {
        if (err) return cb(err);
        debug('Download completed');
        return cb(null);
      });
    });
  }
}

module.exports = Store;
