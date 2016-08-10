const pg = require('pg');

const config = {
  user: 'deepakkumarsingh',
  host: 'localhost',
  port: 5432,
  database: 'leftshifter'
};


class BranchesDb {

  constructor () {
    this.client = new pg.Client(config);

    //   //console.log('in the connect meth');
    console.log('in the constructor');
    //   if (err) return console.error(err);
    //   // this.client.on('end', function() { client.end(); })
    // });
    // connectObj.query("INSERT INTO branches values('deepak', 'dadf')");
      //console.log('in the constructor of database !!', (this.client));
  }


  conMethod() {
    let self = this;
    console.log('in the conMethod');
    return new Promise( (res, rej) => {
      this.client.connect(function (err) {
        console.log('in the connect meth');
        // console.log(err);

        if (err) return rej(err)//console.error(err);
        res(self)
        //console.log('in the ');
        // console.log(client);

        // this.client.on('end', function() { client.end(); })
      });

    })
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
        console.log('inserted');
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
    console.log('in the searchstr');
    const q = 'SELECT * FROM branches WHERE to_tsvector(searchString) @@ to_tsquery($1);';

    return new Promise((res, rej) => {
      console.log('in the return search ');
      this.client.query(q, [searchStr],  (err, results) => {
        if (err) {
          return res(err);
        }
        // this.client.on('row', function(row) {
        //   output.push(row);
        // });

        res(results.rows);
      });

      // this.client.on('row', function(row) {
      //   output.push(row);
      // });
    })
  }
  //   this.client.on('error', function(error) {
  //     console.log(error);
  //     return false;
  //   });
  //
  //   this.client.on('end', function() { client.end(); });
  //   return output;
  // }
}

module.exports = BranchesDb;




/*
// console.log(this.client);
// this.client.query("INSERT INTO branches values('deepak', 'asdf');");
// this.client.query("INSERT INTO branches values($1, $2, $3, $4, $5, %6, %7, $8, $9, $10)", [branches[0].bank, branches[0].ifsc, branches[0].micr, branches[0].branch, branches[0].address, branches[0].contact, branches[0].city, branches[0].district, branches[0].searchString]);
// this.client.on('error', function(error) {
//   console.log(error);
//   return false;
// });

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
