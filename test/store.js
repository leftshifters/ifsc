const expect = require("chai").expect;
const Store = require("../lib/store");
const fs = require('fs');
const utils = require('../lib/utils');

// Test Cases for the lib/Store module
describe("Store", function() {

  it("Results of storeExists() and staleDump() for existence and non-existence file.", function(done) {
    let s = new Store({ diskPath: "test/ifsc_notexist.xls" });
    s.storeExists((err, stats, exists) => {
      expect(err.code).to.be.equal("ENOENT");
      expect(stats).to.be.an('undefined');
      expect(exists).to.be.false;
    });

    s = new Store({ diskPath: "test/ifsc.xls" });
    s.storeExists((err, stats, exists) => {
      expect(err).to.be.null;
      expect(stats).to.not.be.null;
      expect(exists).to.be.true;

      // Find our how old is the file
      let currentTime = new Date().getTime();
      let modifiedTime = stats.mtime.getTime();
      let days = Math.abs(currentTime - modifiedTime) / (1000 * 60 * 60 * 24);

      staleFalse = s.staleDump(stats, Math.ceil(days + 2));
      expect(staleFalse).to.be.false;

      staleFalse = s.staleDump(stats, (Math.floor(days - 2) > 0 ? Math.floor(days - 2) : 0) );
      expect(staleFalse).to.be.true;

      done();
    });
  });

  it("parseStores() and getStore(): result should after parsing have correct length or not ", function() {
    this.timeout(400000);

    let s = new Store({ diskPath: "test/ifsc_32mb.xls" });
    s.parseStores();
    store = s.getStore();
    expect(store.branches.length).to.be.equal(132602);
  });

  it("readLocalStore(): ifsc file records should not null and has correct length.", function(done) {
    let filePath = "test/ifsc_32mb.xls";
    let s = new Store({ diskPath: filePath });
    this.timeout(400000);

    s.readLocalStore((err, branches) => {
      expect(err).to.be.null;
      expect(branches.branches.length).to.be.equal(132602);
      done();
    });
  });

  it("readLocalStore2(): read the local file and expect to have records", function(done) {
    this.timeout(400000);
    filePath = "test/ifsc_32mb.xls";

    // Delete old file if it exists
    if (utils.fileExists(filePath)) {
      fs.unlinkSync(filePath);
    }

    s = new Store({ diskPath: filePath });
    s.readLocalStore((err, branches) => {
      expect(err).to.be.null;
      expect(branches.branches.length).to.be.equal(132602);
      done();
    });
  });

});
