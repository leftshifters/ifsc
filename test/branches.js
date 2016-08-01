const expect = require("chai").expect;
const Parser = require('../lib/parser');

describe('inMemory', function () {
  it('find()', function () {
    let p = new Parser();
    branches = p.parse("test/ifsc.xls");
    console.log(branches);
    output = branches.find("400065003" );
    expect(output.length).to.be.equal(1);
  });
});
