var express = require('express');
var router = express.Router();

/* POST book-request. */
router.post('/new',function(req,res) {
  /* req body should contain: resourceItemId, userId, startDate, endDate */
  // This might requre body parser implementation, but I'm not sure. Probably not.
  const resourceItemId = req.body.resourceItemId;
  const userId = req.body.userId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  //Now do stuff with the parameters!

  res.send('done!');
});

/* GET book-requests listing. */
router.get('/', function(req, res, next) {
  res.send('respond with list of all book-requests');
});

/* GET book-requests listing, with search & filter parameters. */
router.get('/:sUserAscending/:sStartDateAscending/:sEndDateAscending/:fUsersAreStudents/:fUsersFromFaculty/:fTimeRange', function(req, res, next) {
  // Sorting parameters:
  const sortUserAscending = req.params.sUserAscending;
  const sortStartDateAscending = req.params.sStartDateAscending;
  const sortEndDateAscending = req.params.sEndDateAscending;

  // Filtering parameters:
  const usersAreStudents = req.params.fUsersAreStudents;
  const usersFromFaculty = req.params.fUsersFromFaculty;
  const timeRange = req.params.fTimeRange;

  //Now do stuff with the parameters!

  res.send('respond with a list of the sorted + filtered book-requests');
});

module.exports = router;
