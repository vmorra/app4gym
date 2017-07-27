var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var userm = require('../model/users');
var config = require('../config/passport');
var mongoose = require('mongoose');
var _ = require('underscore');

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
    *       - i_account
    *       - i_account_account
    *       - i_password
    *       - a_email
    *       - type
    *       - status
    *     properties:
    *       i_account:
    *         type: string
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
    *          $ref: "#/definitions/role"
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
    * parameters:
    *    username:
    *     name: username
    *     in: path
    *     required: true
    *     description: The person's username
    *     type: string
    *    limit:
    *     name: pageSize
    *     in: query
    *     description: Number of object returned
    *     type: integer
    *    page:
    *     name: pageNumber
    *     in: query
    *     description: Page number
    *     type: integer
    *    idaccount:
    *     name: idaccount
    *     in: query
    *     description: ID of Accoun
    *     type: string
    *     required: true
    *    i_account_name:
    *     name: i_account_name
    *     in: query
    *     description: Account Name
    *     type: string
    *    a_first_name:
    *     name: a_first_name
    *     in: query
    *     description: Account First Name
    *     type: string
    *    a_last_name:
    *     name: a_last_name
    *     in: query
    *     description: Account Last Name
    *     type: string
    *    grlabel:
    *     name: grlabel
    *     in: query
    *     description: Group Label
    *     type: string
    *    cllabel:
    *     name: cllabel
    *     in: query
    *     description: Club Label
    *     type: string
    */


    /**
     * @swagger
     * paths:
     *  /users/{idaccount}:
     *    get:
     *     description: get account detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: idaccount
     *         in: path
     *         description: ID of Accoun
     *         type: string
     *         required: true
     *     responses:
     *       200:
     *         description: Account
     *         schema:
     *           type: object
     *           $ref: "#/definitions/User"
     *       404:
     *         description: User not Found
     *       500:
     *         description: Error Query
     *  /users:
     *    put:
     *     description: update user
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: user.
     *         in: body
     *         required: true
     *         schema:
     *          $ref: "#/definitions/User"
     *     responses:
     *       202:
     *         description: User Updated
     *       404:
     *         description: User not Found
     *       500:
     *        description: Error Saving User
     *    get:
     *     description: get Users
     *     produces:
     *       - application/json
     *     parameters:
     *       - $ref: "#/parameters/i_account_name"
     *       - $ref: "#/parameters/a_first_name"
     *       - $ref: "#/parameters/a_last_name"
     *       - $ref: "#/parameters/grlabel"
     *       - $ref: "#/parameters/cllabel"
     *       - $ref: "#/parameters/limit"
     *       - $ref: "#/parameters/page"
     *     responses:
     *       200:
     *         description: List of All User
     *         schema:
     *           type: array
     *           items:
     *             $ref: "#/definitions/User"
     *       500:
     *        description: Error Query
     */

router.get('/:idaccount',passport.authenticate('jwt', { session: false}),
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

  router.put('/',passport.authenticate('jwt', { session: false}),function(req, res) {
    userm.usermodel.findOne({
      i_account: req.body.i_account,
    }, function(err, user) {
      if (err) {
        console.log('ERR '+err);
        res.status(500).json({code: 2003, msg: 'Error Saving User'});
      };
      if (!user) {
        console.log('Program not Found '+req.boyd.i_code);
        res.status(404).end();
      } else {
        _.extend(user, req.body);
        user.updated_account=req.user.i_account;
        user.save(function(err) {
          if (err) {
            console.log('ERR '+err);
            return res.status(500).json({code: 2003, msg: 'Error Saving User'});
          }
          console.log('User Updated');
          res.status(200).end();
        });
          }
        });
  });

  router.get('/',passport.authenticate('jwt', { session: false}),function(req, res) {

    var query   = {};
    var options = {
        sort:     { i_account_name: -1 },
        lean:     false,
        page:     parseInt(req.query.page),
        limit:    parseInt(req.query.limit)
    };
    if(req.query.i_account_name){
      console.log("Account Name: "+req.query.i_account_name);
      query.i_account_name=new RegExp('^'+req.query.i_account_name);
    }
    if(req.query.a_first_name){
      console.log("Account First Name: "+req.query.a_first_name);
      query.a_first_name=req.query.a_first_name;
    }
    if(req.query.a_last_name){
      console.log("Account Last Name: "+req.query.a_last_name);
      query.a_last_name=req.query.a_last_name;
    }
    if(req.query.grlabel){
      console.log("Group Name: "+req.query.grlabel);
      query.groups.label=req.query.grlabel
    }
    if(req.query.cllabel){
      console.log("Club Label: "+req.query.cllabel);
      query.clubs.label=req.query.cllabel
    }


    userm.usermodel.paginate(query, options).then(function(result,err) {
        if(err){
          console.log('ERR '+JSON.stringify(err));
          return res.status(500).json({code: 2000, msg: 'Error Generic'});
        }
        var response={
          results:result.docs,
          total:result.total
        };
        res.json(response);
    });
  })


module.exports = router;
