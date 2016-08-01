const expect = require("chai").expect;
const Parser = require('../lib/parser');
const utils = require('../lib/utils');

describe('Test the module for fullTextSearch', function () {
  let p = new Parser();
  it('Query the string using inMemory', function () {
    branches = p.parse("test/ifsc.xls");
    const output = branches.find("25260173",'');
    console.log('\n output is ',output, typeof output[0]);
    expect(output).to.be.
    expect(output).to.be.an('Array');
  });

  it('Query the string using full-text-search-ligh Npm', function () {

  });
});


// describe('utils', function () {
//   it('find()', function () {
//     let res = utils.fileExists('ifsc.xls');
//     expect(res).to.be.equal(true)
//   });
// });
