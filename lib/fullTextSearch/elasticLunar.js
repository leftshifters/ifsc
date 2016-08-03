var elasticlunr = require('elasticlunr');

exports.elasticLunar = function (query, branches) {
  var index = elasticlunr();
  console.log('in the elasticsearch !!');

  index.addDoc(JSON.parse(branches));
  console.log(index.search(query));
  return index.search(query);
}
