const expect = require("chai").expect;
const Parser = require('../lib/parser');

describe("Parser", function() {

  it("check for the init() to be not null", function() {
    let p = new Parser({});
    expect(p).to.not.be.null;
  });

  it("checks if parse() result branches property length equal to 4", function() {
    let p = new Parser({});
    branches = p.parse("test/ifsc.xls");
    expect(branches.branches.length).to.be.equal(4);
  });

  it("checks if result of find() has length equal to 1", function() {
    this.timeout(30000);
    let p = new Parser();
    branches = p.parse("test/ifsc.xls");
    // branches = p.parse("68774.xls")
    // console.time("find");
    found = branches.find("mumbai wadia bail");
    // console.timeEnd("find")
    expect(found.length).to.be.equal(1);
  });

});
