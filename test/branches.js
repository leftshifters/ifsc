const expect = require("chai").expect;
const Parser = require('../lib/parser');

describe('FullTextSearch using inMemory', function () {

  //checks that intialize value is neither null or undefined.
  it('Checks for intialized object not equal null or undefined', function () {
    let p = new Parser();
    expect(p).to.exist;
  })

  it('Checks for a string query mumbai', function () {
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    const output = branches.find("mumbai",'');
    console.log('\n output[0] is ',output[0].city, typeof output[0]);
    expect(output).to.be.not.null
    expect(output[0].city).to.be.equal('MUMBAI');
  });
});
