var express = require('express');
var router = express.Router();

var fs = require('fs');

var resourceItemsPath = './mock-database/RESOURCES.json';
var bookRequestsPath = './mock-database/REQUESTS.json';

/* GET resources listing. */
router.get('/', function(req, res, next) {
  res.json(getData(resourceItemsPath));
});

/* GET requests listing by item id. */
router.get('/:id/requests', function(req, res, next) {
  let bookRequests = {};
  let resourceItems = getData(resourceItemsPath);
  let name = resourceItems[req.params.id].name;
  let resourceIds = [];
  Object.entries(resourceItems).forEach(([key, value]) => {
    if (value.name == name) resourceIds.push(parseInt(key));
  })
  Object.entries(getData(bookRequestsPath)).forEach(([key,value]) => {
    if (resourceIds.includes(value.resourceId)) bookRequests[key] = value;
  });
  res.json(bookRequests);
});

var getData = (path) => {
  var jsonData = fs.readFileSync(path);
  return JSON.parse(jsonData);
}

module.exports = router;
