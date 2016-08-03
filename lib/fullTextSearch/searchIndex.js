var searchIndex = require("search-index");

const options =  {
    fieldedSearch: false,
    indexPath: 'si',
    logLevel: 'info',
    store: true
  }


exports.searchI = function (query, branches) {
  console.log("here");
  // console.log(branches);
  searchIndex(options, function (err, si) {
    console.log('here');

    si.add(branches,  function (err) {
      // add stuff to index
      console.log('here !!');
      if (!err) {
        console.log("added Successfully !!");
      } else {
        console.error('error '+err);
      }
      console.log('here !!');
            
      si.search({"query":{'*':query}}, function (err, res) {
      console.log(res);
      return res
        // this.results.push(res);
      });
    });

    console.log('the query is : '+query);
    // let q = {};


  });
}


// class SearchIndex {
//   constructor() {
//     this.result = [];
//   }
//
//   find(query, branches) {
//     console.log(query);
//     query = query.split(' ');
//     console.log(query);
//     searchIndex(options, function (err, si) {
//
//       if (err) {
//         console.log(err);
//       }
//       console.log('here');
//       si.add(branches, {}, function (err) {
//         //add stuff to index
//         console.log('here !!');
//         if (!err) {
//           console.log("added Successfully !!");
//         } else {
//           console.error('error '+err);
//         }
//         console.log('here !!');
//       });
//
//       console.log('the query is : '+query);
//       // let q = {};
//       let q = {'*': query}
//
//
//       si.search(q, function (err, res) {
//         console.log(res);
//         this.results.push(res);
//       });
//     });
//     console.log('search results', this.results);
//     return this.results;
//   }
// }

// module.exports = searchI;
