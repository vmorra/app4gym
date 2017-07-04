var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var userm = require('../model/users');
var config = require('../config/passport');
var mongoose = require('mongoose');
  const uuidv4 = require('uuid/v4');


/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *       400:
 *        description: Authentication failed
 */
  router.post('/login', function(req, res) {
    userm.usermodel.findOne({
      i_account_name: req.body.username
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(400).json({code: 1000, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var idaccount={
              i_account: user.i_account,
              i_account_name: user.i_account_name,
              a_email: user.a_email,
              a_first_name: user.a_first_name,
              a_last_name: user.a_last_name,
              d_birth_date: user.d_birth_date,
              a_address: user.a_address,
              a_city: user.a_city
            };
            // if user is found and password is right create a token
            var token = jwt.sign(idaccount, config.secret, { expiresIn: '1d' });
            // return the information including token as JSON
            res.json({token: token,user: user});
          } else {
            res.status(400).json({code: 1001, msg: 'Authentication failed. Wrong password.'});
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

      nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
        console.log("create TempUSer");
      if (err) {
        return res.status(500).json({code: 2000, msg: 'Error During Signup'});
      }

      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.status(400).json({code: 1002, msg: 'User Already Signup'});
      }

      // new user created
      if (newTempUser) {
        console.log("NewTempUser"+newTempUser);
        var URL = newTempUser[nev.options.URLFieldName];
        console.log("URL TEMP "+URL);
        nev.sendVerificationEmail(useremail, URL, function(err, info) {
          if (err) {
            return res.status(500).json({code: 2001, msg: 'Error Sending Email Verification'});
          }
          res.status(202).end();
        });

      // user already exists in temporary collection!
      } else {
        return res.status(400).json({code: 1003, msg: 'You have already signed up. Please check your email to verify your account'});
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
  });


  // user accesses the link that is sent
  router.get('/email-verification/:URL', function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
      if (user) {
        nev.sendConfirmationEmail(user.a_email, function(err, info) {
          if (err) {
            return res.status(500).json({code: 2002, msg: 'ERROR Sending Confirmation Mail'});
          }
          res.status(201).end();
        });
      } else {
        return res.status(400).json({code: 1004, msg: 'ERROR Sending Confirmation Mail'});
      }
    });
  });

router.get('/profile/:idaccount',passport.authenticate('jwt', { session: false}),
  //require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    var user_id = req.param('idaccount');
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
