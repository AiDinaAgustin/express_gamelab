var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// express session
var session = require('express-session');

var bodyParser = require('body-parser');
var flash = require('req-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Memanggil kelasRouter
var kelasRouter = require('./routes/kelas');
// Memanggil sessionRouter
var sessionRouter = require('./routes/session');
// Definisi lokasi untuk auth
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'iniadalahkeyrahasiamu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'./views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Memanggil kelasRouter
app.use('/kelas', kelasRouter); 
// Memanggil sessionRouter
app.use('/session', sessionRouter);
// Gunakan routes yang telah didefinisikan untuk auth
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
