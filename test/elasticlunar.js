const expect = require("chai").expect;
const Parser = require('../lib/parser');


describe('elasticLunar ', function () {
  it('find(): Results of  query mumbai should have city name mumbai ', function () {
    let p = new Parser();
    const branches = p.parse("test/ifsc.xls");
    this.timeout(240000);
    console.time("find");
    const output = branches.find('mumbai', 'elasticlunr');
    console.timeEnd("find");
    console.log(output);
    expect(output).to.be.equal('MUMBAI');
  });
});
