var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoriesRouter = require('./routes/categories');
var resourceItemsRouter = require('./routes/resourceItems');
var bookRequestsRouter = require('./routes/bookRequests')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/resources', resourceItemsRouter);
app.use('/requests', bookRequestsRouter);
//I named it book-requests to avoid confusion with "http-request"

module.exports = app;

app.listen(8080, () => {console.log("Listening at port 8080")});