var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入Token验证中间件
const verifyMiddleware = require('./utils/verify');

var IndexRouter = require('./routes/index');
var UserRouter = require('./routes/user');
var ClassRouter = require('./routes/class');
var BookRouter = require('./routes/book');
var DictRouter = require('./routes/dict');
var WordRouter = require('./routes/word');
var SpeechRouter = require('./routes/speech');
var MeanRouter = require('./routes/mean');
var CaseRouter = require('./routes/case');
var TrainRouter = require('./routes/train');
var TestRouter = require('./routes/test');
var MistakeRouter = require('./routes/mistake');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRouter);
app.use('/user', verifyMiddleware.verifyToken, UserRouter);
app.use('/class', verifyMiddleware.verifyToken, ClassRouter);
app.use('/book', verifyMiddleware.verifyToken, BookRouter);
app.use('/dict', verifyMiddleware.verifyToken, DictRouter);
app.use('/word', verifyMiddleware.verifyToken, WordRouter);
app.use('/speech', verifyMiddleware.verifyToken, SpeechRouter);
app.use('/mean', verifyMiddleware.verifyToken, MeanRouter);
app.use('/case', verifyMiddleware.verifyToken, CaseRouter);
app.use('/train', verifyMiddleware.verifyToken, TrainRouter);
app.use('/test', verifyMiddleware.verifyToken, TestRouter);
app.use('/mistake', verifyMiddleware.verifyToken, MistakeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
