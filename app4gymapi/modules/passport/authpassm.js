var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var user = require('../../model/users');

// expose this function to our app using module.exports

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
var initPassport = function(){
  passport.use('localauth',new Strategy(
  function(username, password, cb) {
  user.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
}


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  console.log("Serialize User"+ JSON.stringify(user));
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  user.findById(id, function (err, user) {
    if (err) { return cb(err); }
    console.log("Serialize User"+ JSON.stringify(user));
    cb(null, user);
  });
});

module.exports.initPassport = initPassport
