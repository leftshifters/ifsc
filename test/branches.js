var expect = require("chai").expect;
var Parser = require('../lib/parser')

describe('inMemory', function () {
  it('find()', function () {
    let p = new Parser()
    branches = p.parse("test/ifsc.xls")
    output = branches.find("400065003");
    expect(output.length).to.be.equal(1)
  })
})
