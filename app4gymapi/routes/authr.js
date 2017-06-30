var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var userm = require('../model/users');
var config = require('../config/passport');
var mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');





  router.post('/login', function(req, res) {
    userm.usermodel.findOne({
      i_account_name: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(400).json({error: 400, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user, config.secret, { expiresIn: '1d' });
            // return the information including token as JSON
            res.json({token: 'JWT ' + token,user: user});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

  router.post('/signup',
   function(req, res){
     console.log("Signup User");
     var newUser = userm.usermodel({
       i_account: mongoose.Types.ObjectId(),
       i_account_name: req.body.account_name,
       i_password: req.body.password,
       a_email: req.body.email,
       a_first_name: req.body.first_name,
       a_last_name: req.body.last_name,
       d_birth_date: new Date(req.body.birth_date),
       a_address: req.body.address,
       a_city: req.body.city,
       d_created_at: new Date(),
       d_updated_at: new Date()
     });
     var useremail=req.body.email;

      console.log("create TempUSer");
      nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
        console.log("create TempUSer");
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED');
      }

      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.json({
          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
        });
      }

      // new user created
      if (newTempUser) {
        console.log("NewTempUser"+newTempUser);
        var URL = newTempUser[nev.options.URLFieldName];
        console.log("URL TEMP "+URL);
        nev.sendVerificationEmail(useremail, URL, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending verification email FAILED');
          }
          res.json({
            msg: 'An email has been sent to you. Please check it to verify your account.',
            info: info
          });
        });

      // user already exists in temporary collection!
      } else {
        res.json({
          msg: 'You have already signed up. Please check your email to verify your account.'
        });
      }
    });
    /*newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
      res.status(202).end();
    });*/

   });


 router.get('/logout',
  function(req, res){
    console.log("Logout User");
    req.logout();
    res.redirect('/');
  });


  // user accesses the link that is sent
  router.get('/email-verification/:URL', function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
      if (user) {
        nev.sendConfirmationEmail(user.a_email, function(err, info) {
          if (err) {
            return res.status(404).send('ERROR: sending confirmation email FAILED');
          }
          res.json({
            msg: 'CONFIRMED!',
            info: info
          });
        });
      } else {
        return res.status(404).send('ERROR: confirming temp user FAILED');
      }
    });
  });

router.get('/profile/:idaccount',passport.authenticate('jwt', { session: false}),
  //require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    var user_id = req.param('id');
    userm.usermodel.findOne({
      i_account_name: req.param.idaccount
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(404).end();
      } else {
            res.json(user);
          }
        });
  });

module.exports = router;
