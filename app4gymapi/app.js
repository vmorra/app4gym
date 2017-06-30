var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var _ = require("lodash");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var cors = require('cors');
nev = require('email-verification')(mongoose);

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var userm = require('./model/users');
var config = require('./config/passport');

var index = require('./routes/index');
var users = require('./routes/users');
var authr = require('./routes/authr');


//Init Startegy Passport
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = userm.usermodel.findOne({'i_account' :jwt_payload.id}, function(err, user){
    if (err) {
          return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
  });
});

passport.use(strategy);

//Init Opts Email Verification
nev.configure({
    verificationURL: 'http://localhost:3001/api/auth/email-verification/${URL}',
    URLLength: 48,
    persistentUserModel: userm.usermodel,
    emailFieldName: 'a_email',

    expirationTime: 120,

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'ingvincenzomorra@gmail.com',
            pass: 'EdinsonCavani0/25'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});

nev.generateTempUserModel(userm.usermodel, function(err, tempUserModel) {
   if (err) {
     console.log(err);
     return;
   }

   console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
 });


var app = express();

mongoose.connect('mongodb://app4gymbe:app4gymbe@ds129352.mlab.com:29352/app4gymco');
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
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
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));


app.use('/', index);
app.use('/api/users', users);
app.use('/api/auth', authr);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
