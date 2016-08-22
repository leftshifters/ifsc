const expect = require("chai").expect;
const Parser = require('../lib/parser');
const Database = require('../model/databaseStorage');

describe('database', function () {

  it('Intialized and insert values in tables.', function (done) {
    const p = new Parser();
    this.timeout(600000);
    const branches = p.parse("test/ifsc_32mb.xls");
    // database = new Database();
    // database.conMethod();
    branches.database.insert(branches.branches).then(() => done()).catch(err => {
      console.error(err);
    });
    // done();
  });

  // checks for the string search results.
  it('searchdb() method should fetch all matching branches', function (done) {
    this.timeout(360000);
    console.time('find');
    const database = new Database();
    database.search('state bank of india kota rajasthan').then((res) => {
      // for (var i = 0; i < res.length; i++) {
      //   // console.log('results is ', res.length, res[i]);
      // }
      console.log('results is ', res.length, res[0]);
      expect(res).to.be.not.null;
      console.timeEnd('find');
      done();
    }).catch(err => console.log(err));
  });
});



/*
var branches, database, p;
before((done) => {
  database = new Database();
  database.conMethod().then(() => done())
});

// after((done) => {
//
// })

//checks that intialize value is neither null or undefined.
it('Intialized and insert values in tables.', function (done) {
  p = new Parser();
  this.timeout(360000);
  const branches = p.parse("test/ifsc_32mb.xls");
  database.insert(branches.branches).then(() => done());
  // done();
});


// checks for the string search results.
it('searchdb() method should fetch all matching branches', function (done) {
  this.timeout(360000);
  console.time('find');
  database.search('mumbai').then(res => {
    // console.log(res);
    console.log('results is ', res.length, res[0]);
    expect(res).to.be.not.null
    console.timeEnd('find');
    done()
  }).catch(err => console.log(err));
});

*/

/*

database.conMethod().then(db => {
//   let output =  db.search("mumbai");
//   expect(output).to.be.not.null
//
// }).then(()=> done()).catch();




.catch(e => console.log(e)).then(() => done());
expect(database).to.exist;
checks for the branch insertions.
it('insert() branches object into the database.', function () {
  p = new Parser();
  const branches = p.parse("test/ifsc.xls");
  const database = new Database();
  // console.log(database);
  this.timeout(450000);
  const output = database.insert(branches.branches);
  // expect(output).to.be.not.null
  // expect(output).to.be.equal(true);
});



//   return db.insert(branches.branches);
//
// }).then(() => done()).catch(e => console.log(e));
*/


/*
for searchdb()

// database.conMethod().then(db => {
//   let output =  db.search("mumbai");
//   expect(output).to.be.not.null
//   done()
// });

// catch(e => console.log(e)).then(done);

// console.log(output);
// expect(output).to.be.not.null
// expect(output).to.be.equal('MUMBAI');


*/
