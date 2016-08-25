const express = require('express');
const router = express.Router();
const Store = require('../lib/store');

const store = new Store({ diskPath: "test/ifsc_32mb.xls" });
var branches;
store.readLocalStore(function(err) {
  if (err) console.console.error(err);
  else {
    branches = store.getStore();
  }
});

router.get('/search', function(req, res, next) {
  res.status(404);
  res.json({err:"Please enter a search term"});
});

/* GET search */
router.get('/search/:term', function(req, res, next) {
  let term = unescape(req.params.term);
  term = term.replace('+', ' ');
  found = branches.find(term, 'db');
  res.json(found);
});

module.exports = router;
