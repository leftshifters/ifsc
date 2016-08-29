const expect = require("chai").expect;
const Parser = require('../lib/parser');

// Test Cases for the lib/parser module.
describe("Parser", function() {
  let p;
  it("init() to be not null", function() {
    p = new Parser();
    expect(p).to.not.be.null;
  });

  it("Parse() result branches property correct length", function() {
    // let p = new Parser();
    this.timeout(30000);
    const branches = p.parse("test/ifsc_small.xlsx");
    expect(branches.branches.length).to.be.equal(5);
  });

  it("Result of find() has length equal to 1", function() {
    this.timeout(400000);
    // let p = new Parser();
    const branches = p.parse("test/ifsc_small.xlsx");
    // branches = p.parse("68774.xls")
    // console.time("find");
    found = branches.find("mumbai wadia bail");
    // console.timeEnd("find")
    expect(found.length).to.be.equal(1);
  });

});
