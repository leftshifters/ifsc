const Pool = require('pg').Pool;
require('events').EventEmitter.prototype._maxListeners = 50;
const config = {
  user: 'deepakkumarsingh',
  host: 'localhost',
  port: 5432,
  database: 'leftshifter',
  max: 20,
  idleTimeoutMillis: 10000
};

var inc = 0;

class BranchesDb {

  constructor () {
    this.client = new Pool(config);
    this.client.connect();
    //   //console.log('in the connect meth');
    console.log('in the constructor');

  }


  insertOne(query, branch) {
    // console.log("here")
    return new Promise((res, rej) => {
      this.client.query(query, [  branch.bank,
                                  branch.ifsc,
                                  branch.micr,
                                  branch.branch,
                                  branch.address,
                                  branch.contact,
                                  branch.city,
                                  branch.district,
                                  branch.state,
                                  branch.searchString ], function (err) {
        if (err) {
          return rej(err);
        }
        // console.log('inserted');
        res();
      });
    });
  }


  insert(branches) {
    var query = "INSERT INTO branches values($1, $2, $3, $4, $5, $6, $7, $8, $9, to_tsvector($10));";

    return Promise.all(branches.map((branch) => {
        // console.log(this.insertOne);
        return this.insertOne(query, branch);
      }));
  }

  search(searchStr) {
    const output = [];
    // console.log('in the searchstr');
    const q = 'SELECT * FROM branches WHERE (searchstring) @@  plainto_tsquery($1);';
    this.client.on('drain', this.client.end.bind(this.client));
    this.client.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
  })

    return new Promise((res, rej) => {
      // console.log('search method ');
      console.time('search');
      this.client.query(q, [searchStr],  (err, results) => {
        if (err) {
          return res(err);
        }
        // console.log(inc++);
        // console.log('results has been fetched ', results.rows[0]);
        // console.timeEnd('search');
        res(results.rows);
      });

    });
  }
}

module.exports = BranchesDb;




/*

// conMethod() {
//   let self = this;
//   console.log('in the conMethod');
//   return new Promise( (res, rej) => {
//     this.client.connect(function (err) {
//       console.log('in the connect meth');
//       // console.log(err);
//       if (err) return rej(err)//console.error(err);
//       res(self)
//     });
//   })
// }

// console.log(this.client);
// this.client.query("INSERT INTO branches values('deepak', 'asdf');");
// this.client.query("INSERT INTO branches values($1, $2, $3, $4, $5, %6, %7, $8, $9, $10)", [branches[0].bank, branches[0].ifsc, branches[0].micr, branches[0].branch, branches[0].address, branches[0].contact, branches[0].city, branches[0].district, branches[0].searchString]);
// this.client.on('error', function(error) {
//   console.log(error);
//   return false;
// });


//   this.client.on('error', function(error) {
//     console.log(error);
//     return false;
//   });
//
//   this.client.on('end', function() { client.end(); });
//   return output;
// }

// console.log('in the insert method');
//
//
// console.log('below the connect');
// this.client.on('error', function(error) {
//   console.log(error);
//   return false;
// });

// this.client.on('end', function() { client.end(); })
// return true;


*/
