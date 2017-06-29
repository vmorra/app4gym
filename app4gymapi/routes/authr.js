var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var userm = require('../model/users');
var config = require('../config/passport');
var mongoose = require('mongoose');



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
       i_account: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
       i_account_name: req.body.account_name,
       i_password: req.body.password,
       a_first_name: req.body.first_name,
       a_last_name: req.body.last_name,
       d_birth_date: new Date(req.body.birth_date),
       a_address: req.body.address,
       a_city: req.body.city,
       d_created_at: new Date(),
       d_updated_at: new Date()
     });

    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
      res.status(202).end();
    });

   });


 router.get('/logout',
  function(req, res){
    console.log("Logout User");
    req.logout();
    res.redirect('/');
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
