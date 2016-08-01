const expect = require("chai").expect;
const Parser = require('../lib/parser');
const utils = require('../lib/utils');

describe('Test the module for fullTextSearch', function () {
  let p = new Parser();
  it('Query the string using inMemory', function () {
    branches = p.parse("test/ifsc.xls");
    const output = branches.find("mumbai",'');
    console.log('\n output[0] is ',output[0].city, typeof output[0]);
    expect(output[0].city).to.be.equal('MUMBAI');
  });
});


// describe('utils', function () {
//   it('find()', function () {
//     let res = utils.fileExists('ifsc.xls');
//     expect(res).to.be.equal(true)
//   });
// });
