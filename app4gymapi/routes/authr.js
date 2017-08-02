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
 * definitions:
 *   club:
 *     type: object
 *     required:
 *       - label
 *     properties:
 *       label:
 *         type: string
 *       description:
 *         type: string
 */

 /**
  * @swagger
  * definitions:
  *   userlogin:
  *     type: object
  *     required:
  *       - username
  *       - password
  *     properties:
  *       username:
  *         type: string
  *       password:
  *         type: string
  */

 /**
  * @swagger
  * definitions:
  *   group:
  *     type: object
  *     required:
  *       - label
  *     properties:
  *       label:
  *         type: string
  *       description:
  *         type: string
  */

/**
 * @swagger
 * definitions:
 *   role:
 *     type: object
 *     required:
 *       - code
 *       - label
 *     properties:
 *       code:
 *         type: number
 *         enum: [1,2,3,4]
 *       label:
 *         type: string
 *         enum: ['User', 'Team','Organization','Admin']
 *       description:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - i_account_name
 *       - i_password
 *       - a_email
 *       - type
 *       - status
 *     properties:
 *       i_account_name:
 *         type: string
 *       i_password:
 *         type: string
 *       a_email:
 *         type: string
 *         example:
 *          - abc@domain.com
 *       a_first_name:
 *         type: string
 *       a_last_name:
 *         type: string
 *       d_birth_date:
 *         type: string
 *         format: date
 *       a_address:
 *         type: string
 *       a_city:
 *         type: string
 *       type:
 *         type: string
 *         enum: ['Tecnico', 'Ginnasta','Organizzazione']
 *       roles:
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/role
 *       status:
 *         type: string
 *         enum: ['Pending', 'Active','Deleted']
 *       groups:
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/group"
 *       clubs:
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/club"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login to the application
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userlogin
 *         description: Username to use for login.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/userlogin"
 *     responses:
 *       200:
 *         description: login
 *       400:
 *        description: Authentication failed
 * /auth/signup:
 *   post:
 *     description: insert new User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: program
 *         description: program.
 *         in: body
 *         required: true
 *         schema:
 *          $ref: "#/definitions/User"
 *     responses:
 *       202:
 *         description: User Created
 *       500:
 *        description: Error User Program
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
              a_city: user.a_city,
              type: user.type,
              role: user.role,
              roles: user.roles,
              status: user.status,
              groups: user.groups,
              clubs: user.clubs,
              lastn: 'casa'
            };
            // if user is found and password is right create a token
            var token = jwt.sign(idaccount, config.secret, { expiresIn: '1d' });
            // return the information including token as JSON
            res.json({token: token,user: idaccount});
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
     var newUser = userm.usermodel(req.body);
     newUser.i_account=mongoose.Types.ObjectId();
     newUser.role='User';
     newUser.status='Pending';
     var useremail=req.body.a_email;

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

var findsaveUserafterVerification=function(userobj){
  userm.usermodel.findOne({
    i_account: userobj.i_account,
  }, function(err, user) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving User'});
    };
    if (!user) {
      console.log('User not Found '+userobj.i_account);
      res.status(404).end();
    } else {
      user.role='User';
      user.status='Active';
      user.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving User'});
        }
        console.log('User confirmed');
      });
        }
      });
}
  // user accesses the link that is sent
  router.get('/email-verification/:URL', function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
      if (user) {
        findsaveUserafterVerification(user);
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
