const expect = require("chai").expect;
const utils  = require('../lib/utils');


// console.log('in the favicon', typeof favicon);
// console.log(__dirname + '/public/images/logo.png');
describe('utils', function () {
  it('test for the existence', function () {
    const filePath = 'test/ifsc_small.xlsx';
    const output = utils.fileExists(filePath);
    expect(output).to.be.equal(true);
  });

});



/* favicon test case
const crypto = require('crypto');
const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const favicon = crypto.createHash('sha1').update(fs.readFileSync('/Users/deepakkumarsingh/Desktop/Projects/ifsc/public/images/logo.png')).digest('hex');

it("favicon", function (done) {
  request.get("http://localhost:3000/favicon.ico", function (err, res, body) {
    expect(crypto.createHash('sha1').update(body).digest('hex')).to.be.equal(favicon);
    done();
  });
});
**/
