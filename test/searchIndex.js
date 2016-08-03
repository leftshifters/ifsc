const expect = require("chai").expect;
const Parser = require('../lib/parser');


describe('searchIndex ', function () {
  it('find(): Results of  query mumbai should have city name mumbai ', function () {
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    this.timeout(180000);
    console.time("find");
    const output = branches.find('mumbai', 'searchindex');
    console.timeEnd("find");
    console.log('final output '+output);
    expect(output).to.be.equal('MUMBAI');
  });
});
