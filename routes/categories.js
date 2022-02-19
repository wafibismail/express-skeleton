var express = require('express');
var router = express.Router();

var fs = require('fs');

var categoriesPath = './mock-database/CATEGORIES.json';
var resourceItemsPath = './mock-database/RESOURCES.json';

/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.json(getData(categoriesPath));
});

/* GET category content listing. */
router.get('/:id/resources', function(req, res, next) {
  let resourceItems = {};
  let id = req.params.id;
  Object.entries(getData(resourceItemsPath)).forEach(([key,value]) => {
    if (value.categoryId == id) resourceItems[key] = value;
  });
  res.json(resourceItems);
});

var getData = (path) => {
  var jsonData = fs.readFileSync(path);
  return JSON.parse(jsonData);
}

module.exports = router;
