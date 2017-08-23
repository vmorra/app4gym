var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var programm = require('../model/program');
var config = require('../config/passport');
var mongoose = require('mongoose');
var _ = require('underscore');
var roleMatch = require('../modules/auth/roleMatch');

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
 *       type:
 *         type: string
 *         example:
 *          - Codice Punteggi Internazionale
 *          - Programma Silver
 *          - Programma Gold
 *       description:
 *         type: string
 *       period:
 *         type: string
 *         enum: ['2017-2020', '2021-2024']
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
 *         example:
 *          - Corpo Libero
 *          - Cavallo con Maniglie
 *          - Anelli
 *          - Volteggio
 *          - Parallele
 *          - Sbarra
 *          - Parallele asimmetriche
 *          - Trave
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
*    protype:
*     name: protype
*     in: query
*     description: Program Type
*     type: string
*    proname:
*     name: proname
*     in: query
*     description: Program Name
*     type: string
*    skname:
*     name: skname
*     in: query
*     description: Skill Name
*     type: string
*    brname:
*     name: brname
*     in: query
*     description: Branch Name
*     type: string
*    brlabel:
*     name: brlabel
*     in: query
*     description: Branch Label
*     type: string
*    appname:
*     name: appname
*     in: query
*     description: Apparatus Name
*     type: string
*    applabel:
*     name: applabel
*     in: query
*     description: Apparatus Label
*     type: string
*    egname:
*     name: egname
*     in: query
*     description: Element Group
*     type: string
*    eglabel:
*     name: eglabel
*     in: query
*     description: Element Label
*     type: string
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
  *       - $ref: "#/parameters/protype"
  *       - $ref: "#/parameters/proname"
  *       - $ref: "#/parameters/skname"
  *       - $ref: "#/parameters/brname"
  *       - $ref: "#/parameters/brlabel"
  *       - $ref: "#/parameters/appname"
  *       - $ref: "#/parameters/applabel"
  *       - $ref: "#/parameters/egname"
  *       - $ref: "#/parameters/eglabel"
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


var postPrograms=function(req, res,next) {
  var newProgram = programm.programmodel(req.body);
  newProgram.created_account=req.user.i_account;
  newProgram.save(function(err) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Program'});
    }
    console.log('Program Created');
    res.status(202).end();
  });
};

var putPrograms=function(req, res,next) {
  programm.programmodel.findOne({
    code: req.body.code,
  }, function(err, program) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Program'});
    };
    if (!program) {
      console.log('Program not Found '+req.body.code);
      res.status(404).end();
    } else {
      _.extend(program, req.body);
      program.updated_account=req.user.i_account;
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
};

var getPrograms=function(req,res,next){
  var query   = {};
  var options = {
      sort:     { publishDate: -1 },
      lean:     false,
      page:     parseInt(req.query.page),
      limit:    parseInt(req.query.limit)
  };
  if(req.query.protype){
    console.log("Param Type: "+req.query.protype);
    query.type=req.query.protype;
  }
  if(req.query.proname){
    console.log("Param Name: "+req.query.proname);
    query.name=req.query.proname;
  }
  if(req.query.skname){
    console.log("Param Skill Name: "+req.query.skname);
    query.skills.name=req.query.skname;
  }
  if(req.query.brname){
    console.log("Param Branch Name: "+req.query.brname);
    query.skills.branch.name=req.query.brname
  }
  if(req.query.brlabel){
    console.log("Param Branch Label: "+req.query.brlabel);
    query.skills.branch.label=req.query.brlabel
  }
  if(req.query.appname){
    console.log("Param Apparatus Name: "+req.query.appname);
    query.skills.branch.apparatus.name=req.query.appname
  }
  if(req.query.applabel){
    console.log("Param Apparatus Label: "+req.query.applabel);
    query.skills.branch.apparatus.label=req.query.applabel
  }
  if(req.query.egname){
    console.log("Param ElementGroup Name: "+req.query.egname);
    query.skills.branch.apparatus.elementgroup.name=req.query.egname
  }
  if(req.query.eglabel){
    console.log("Param ElementGroup Label: "+req.query.eglabel);
    query.skills.branch.apparatus.elementgroup.label=req.query.eglabel
  }

  programm.programmodel.paginate(query, options).then(function(result,err) {
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
}

var getProgramId=function(req, res,next) {
  programm.programmodel.findOne({
    code: req.params.programid
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
};

router.post('/', passport.authenticate('jwt', { session: false}),[roleMatch.checkApiRoleHeader,postPrograms]);

router.put('/',passport.authenticate('jwt', { session: false}),[roleMatch.checkApiRoleHeader,putPrograms]);

router.get('/',passport.authenticate('jwt', { session: false}),[roleMatch.checkApiRoleHeader,getPrograms]);

router.get('/program/:programid',passport.authenticate('jwt', { session: false}),[roleMatch.checkApiRoleHeader,getProgramId]);

module.exports = router;
