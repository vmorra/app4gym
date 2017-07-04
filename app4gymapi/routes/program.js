var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var programm = require('../model/program');
var config = require('../config/passport');
var mongoose = require('mongoose');
var _ = require('underscore');

/**
 * @swagger
 * definitions:
 *   Program:
 *     type: object
 *     required:
 *       - code
 *       - name
 *     properties:
 *       code:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       skills:
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/Skill"
 *       publishDate:
 *         type: string
 *         format: date-time
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 */

/**
  * @swagger
  * definitions:
  *   Skill:
  *     type: object
  *     required:
  *       - code
  *       - name
  *       - difficulty
  *       - value
  *     properties:
  *       code:
  *         type: string
  *       name:
  *         type: string
  *       description:
  *         type: string
  *       difficulty:
  *         type: string
  *         enum: ['A', 'B','C','D','E','F','G','H']
  *       value:
  *         type: number
  *         format: double
  *         minimum: 0.1
  *         maximum: 5.0
  *       grid_index:
  *         type: string
  *       image:
  *         type: string
  *         format: url
  *       video:
  *         type: string
  *         format: url
  *       branch:
  *         $ref: '#/definitions/Branch'
  */



/**
 * @swagger
 * definitions:
 *   Branch:
 *     type: object
 *     required:
 *       - name
 *       - label
 *     properties:
 *       name:
 *         type: string
 *       label:
 *         type: string
 *       apparatus:
 *         $ref: '#/definitions/Apparatus'
 */

/**
 * @swagger
 * definitions:
 *   Apparatus:
 *     type: object
 *     required:
 *       - name
 *       - label
 *     properties:
 *       name:
 *         type: string
 *       label:
 *         type: string
 *       elementGroup:
 *         $ref: '#/definitions/elementGroup'
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
*/

/**
 * @swagger
 * definitions:
 *   elementGroup:
 *     type: object
 *     required:
 *       - name
 *       - label
 *     properties:
 *       name:
 *         type: string
 *       label:
 *         type: string
 */


 /**
  * @swagger
  * /programs:
  *   post:
  *     description: insert program
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
  *          $ref: "#/definitions/Program"
  *     responses:
  *       202:
  *         description: Programe Created
  *       500:
  *        description: Error Saving Program
  *   put:
  *     description: update program
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
  *          $ref: "#/definitions/Program"
  *     responses:
  *       202:
  *         description: Program Updated
  *       404:
  *         description: Program not Found
  *       500:
  *        description: Error Saving Program
  *   get:
  *     description: update program
  *     produces:
  *       - application/json
  *     parameters:
  *       - $ref: "#/parameters/limit"
  *       - $ref: "#/parameters/page"
  *     responses:
  *       200:
  *         description: List of All Programs
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/Program"
  *       500:
  *        description: Error Query
  */

/**
 * @swagger
 * paths:
 *  /program/{programid}:
 *    get:
 *      description: update program
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: programid
 *        in: path
 *        type: string
 *        description: ID of Program
 *        required: true
 *      responses:
 *        200:
 *          description: List of All Programs
 *          schema:
 *            type: object
 *            $ref: "#/definitions/Program"
 *        404:
 *          description: Program not Found
 *        500:
 *          description: Error Query
 */


router.post('/', passport.authenticate('jwt', { session: false}),function(req, res) {
  var newProgram = programm.programmodel(req.body);
  newProgram.save(function(err) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Program'});
    }
    console.log('Program Created');
    res.status(202).end();
  });
});

router.put('/',passport.authenticate('jwt', { session: false}),function(req, res) {
  programm.programmodel.findOne({
    code: req.body.code,
  }, function(err, program) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Program'});
    };
    if (!program) {
      console.log('Program not Found '+req.boyd.i_code);
      res.status(404).end();
    } else {
      _.extend(program, req.body);
      program.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Program'});
        }
        console.log('Program Updated');
        res.status(200).end();
      });
        }
      });
});

router.get('/',passport.authenticate('jwt', { session: false}),function(req, res) {
  var query   = {};
  var options = {
      sort:     { publishDate: -1 },
      lean:     false,
      page:     parseInt(req.query.page),
      limit:    parseInt(req.query.limit)
  };
  programm.programmodel.paginate(query, options).then(function(err,result) {
      if(err){
        console.log('ERR '+err);
        return res.status(500).json({code: 2000, msg: 'Error Generic'});
      }
      var response={
        results:result.docs,
        total:result.total
      };
      res.json(response);
  });
})

router.get('/program/:programid',passport.authenticate('jwt', { session: false}),function(req, res) {
  programm.programmodel.findOne({
    code: req.param.programid
  }, function(err, program) {
    if (err) {
      console.log('ERR '+err);
      return res.status(500).json({code: 2000, msg: 'Error Generic'});
    }
    if (!program) {
      res.status(404).end();
    } else {
          res.json(program);
        }
      });
})

module.exports = router;
