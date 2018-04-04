var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var crawling = require('./controller/crawling');
var voice = require('./controller/voice');
var member = require('./controller/member');
var study = require('./controller/study');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/voice', voice);
app.use('/member', member);
app.use('/crawling', crawling);
app.use('/study', study);

process.on('uncaughtException', function(ex) {
  //console.log(ex);
  //console.log("ERROR");
    // do something with exception
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  var json = {
      ERR_CODE: "404"
      ,ERR_MSG : "NOT_PAGE"
  }
  res.send(json);
  //next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    /*
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  */

    var json = {
        ERR_CODE: "500"
        ,ERR_MSG : err.message
    }
    res.send(json);
});


module.exports = app;
