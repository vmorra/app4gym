var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var branch = require('../model/branch');
var config = require('../config/passport');
var mongoose = require('mongoose');
var _ = require('underscore');


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
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/Apparatus"
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
 *       elementgroups:
 *         type: array
 *         minLength: 0
 *         items:
 *          $ref: "#/definitions/elementGroup"
 */

/**
* @swagger
* paramseters:
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
  * /branches:
  *   post:
  *     description: insert branch
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     paramseters:
  *       - name: branch
  *         description: branch.
  *         in: body
  *         required: true
  *         schema:
  *          $ref: "#/definitions/Branch"
  *     responses:
  *       202:
  *         description: Branch Created
  *       500:
  *        description: Error Saving Branch
  *   put:
  *     description: update Branch
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     paramseters:
  *       - name: branch
  *         description: branch.
  *         in: body
  *         required: true
  *         schema:
  *          $ref: "#/definitions/Branch"
  *     responses:
  *       202:
  *         description: Branch Updated
  *       404:
  *         description: Branch not Found
  *       500:
  *        description: Error Saving Branch
  *   get:
  *     description: get Branch
  *     produces:
  *       - application/json
  *     paramseters:
  *       - $ref: "#/paramseters/brname"
  *       - $ref: "#/paramseters/brlabel"
  *       - $ref: "#/paramseters/appname"
  *       - $ref: "#/paramseters/applabel"
  *       - $ref: "#/paramseters/egname"
  *       - $ref: "#/paramseters/eglabel"
  *       - $ref: "#/paramseters/limit"
  *       - $ref: "#/paramseters/page"
  *     responses:
  *       200:
  *         description: List of All Branch
  *         schema:
  *           type: array
  *           items:
  *             $ref: "#/definitions/Branch"
  *       500:
  *        description: Error Query
  */

/**
 * @swagger
 * paths:
 *  /branches/{branchid}:
 *    get:
 *      description: get branch
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      responses:
 *        200:
 *          description: List of All Branch
 *          schema:
 *            type: object
 *            $ref: "#/definitions/Branch"
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Query
 *  /branches/{branchid}/apparatus/{apparatusid}:
 *    put:
 *      description: update Apparatus of branch
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatusid
 *        in: path
 *        type: string
 *        description: ID of Apparatus
 *        required: true
 *      - name: apparatus
 *        description: apparatus.
 *        in: body
 *        required: true
 *        schema:
 *         $ref: "#/definitions/Apparatus"
 *      responses:
 *        200:
 *          description: Updated Apparatus
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Updating Apparatus
 *    get:
 *      description: get apparatus of branch
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatusid
 *        in: path
 *        type: string
 *        description: ID of Apparatus
 *        required: true
 *      responses:
 *        200:
 *          description: List of All Branch
 *          schema:
 *            type: object
 *            $ref: "#/definitions/Branch"
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Query
 *  /branches/{branchid}/apparatus/:
 *    post:
 *      description: add apparatus of branch
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatus
 *        description: apparatus.
 *        in: body
 *        required: true
 *        schema:
 *         $ref: "#/definitions/Apparatus"
 *      responses:
 *        200:
 *          description: Add Apparatus
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Add Apparatus
 *  /branches/{branchid}/apparatus/{apparatusid}/elementgroup:
 *    post:
 *      description: Add elementGroup of branch
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatusid
 *        in: path
 *        type: string
 *        description: ID of Apparatus
 *        required: true
 *      - name: elementgroup
 *        description: elementgroup.
 *        in: body
 *        required: true
 *        schema:
 *         $ref: "#/definitions/elementGroup"
 *      responses:
 *        200:
 *          description: Add elementGroup
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Add elementGroup
 *  /branches/{branchid}/apparatus/{apparatusid}/elementgroup/{elementgroupid}:
 *    put:
 *      description: update elementGroup of branch
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatusid
 *        in: path
 *        type: string
 *        description: ID of Apparatus
 *        required: true
 *      - name: elementgroupid
 *        in: path
 *        type: string
 *        description: ID of ElementGroup
 *        required: true
 *      - name: elementgroup
 *        description: elementgroup.
 *        in: body
 *        required: true
 *        schema:
 *         $ref: "#/definitions/elementGroup"
 *      responses:
 *        200:
 *          description: Updated elementGroup
 *        404:
 *          description: Branch not Found
 *        500:
 *          description: Error Updating elementGroup
 *    get:
 *      description: get apparatus of branch
 *      produces:
 *      - application/json
 *      paramseters:
 *      - name: branchid
 *        in: path
 *        type: string
 *        description: ID of Branch
 *        required: true
 *      - name: apparatusid
 *        in: path
 *        type: string
 *        description: ID of Apparatus
 *        required: true
 *      - name: elementgroupid
 *        in: path
 *        type: string
 *        description: ID of Element Group
 *        required: true
 *      responses:
 *        200:
 *          description: List of All Branch
 *          schema:
 *            type: object
 *            $ref: "#/definitions/Branch"
 *        404:
 *          description: Element Group not Found
 *        500:
 *          description: Error Query
 */


router.post('/', passport.authenticate('jwt', { session: false}),function(req, res) {
  console.log('Save Request Branch '+req.body);
  var newBranch = branch.branchmodel(req.body);
  newBranch.created_account=req.user.i_account;
  newBranch.save(function(err) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
    }
    console.log('Branch Created');
    res.status(202).end();
  });
});

router.post('/:branchid/apparatus', passport.authenticate('jwt', { session: false}),function(req, res) {
  console.log('BRANCHID '+req.params.branchid);
  branch.branchmodel.findOne({
    'label': req.params.branchid
  }, function(err, oldbranch) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Batch'});
    };
    if (!oldbranch) {
      console.log('Branch not Found '+req.params.branchid);
      res.status(404).end();
    } else {
      oldbranch.apparatus.push(req.body);
      oldbranch.updated_account=req.user.i_account;
      oldbranch.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
        }
        console.log('Branch Updated');
        res.status(200).end();
          });
        }
      });
});


router.post('/:branchid/apparatus/:apparatusid/elementgroup', passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid,
    'apparatus.label': req.params.apparatusid
  }, function(err, oldbranch) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Batch'});
    };
    if (!oldbranch) {
      console.log('Branch not Found '+req.params.branchid);
      res.status(404).end();
    } else {
      for(var i=0 ; i<oldbranch.apparatus.length; i++){
        var appr=oldbranch.apparatus[i];
        if(appr.label==req.params.apparatusid){
          appr.elementgroups.push(req.body);
        }
      }
      oldbranch.updated_account=req.user.i_account;
      oldbranch.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
        }
        console.log('Branch Updated');
        res.status(200).end();
      });
        }
      });
});

router.put('/',passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.body.label,
  }, function(err, oldbranch) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Batch'});
    };
    if (!oldbranch) {
      console.log('Branch not Found '+req.body.label);
      res.status(404).end();
    } else {
      _.extend(oldbranch, req.body);
      oldbranch.updated_account=req.user.i_account;
      oldbranch.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
        }
        console.log('Branch Updated');
        res.status(200).end();
      });
        }
      });
});

router.put('/:branchid/apparatus/:apparatusid', passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid,
    'apparatus.label': req.params.apparatusid
  }, function(err, oldbranch) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Batch'});
    };
    if (!oldbranch) {
      console.log('Branch not Found '+req.params.branchid);
      res.status(404).end();
    } else {
      for(var i=0 ; i<oldbranch.apparatus.length; i++){
        var appr=oldbranch.apparatus[i];
        if(appr.label==req.params.apparatusid){
          oldbranch.apparatus.splice(i, 0, req.body);
        }
      }
      oldbranch.updated_account=req.user.i_account;
      oldbranch.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
        }
        console.log('Branch Updated');
        res.status(200).end();
      });
        }
      });
});


router.put('/:branchid/apparatus/:apparatusid/elementgroup/:elementgroupid', passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid,
    'apparatus.label': req.params.apparatusid,
    'apparatus.elementgroups.label': req.params.elementgroupid
  }, function(err, oldbranch) {
    if (err) {
      console.log('ERR '+err);
      res.status(500).json({code: 2003, msg: 'Error Saving Batch'});
    };
    if (!oldbranch) {
      console.log('Branch not Found '+req.params.branchid);
      res.status(404).end();
    } else {
      for(var i=0 ; i<oldbranch.apparatus.length; i++){
        var appr=oldbranch.apparatus[i];
        if(appr.label==req.params.apparatusid){
          for(var j=0; j < appr.elementgroups.length ; j++ ){
            var egrp=appr.elementgroups[j];
            if(egrp.labek==req.params.elementgroupid){
              oldbranch.apparatus.elementgroups.splice(j, 0, req.body);
              break;
            }
          }
          appr.elementgroups.push(req.body);
        }
      }
      oldbranch.updated_account=req.user.i_account;
      oldbranch.save(function(err) {
        if (err) {
          console.log('ERR '+err);
          return res.status(500).json({code: 2003, msg: 'Error Saving Branch'});
        }
        console.log('Branch Updated');
        res.status(200).end();
      });
        }
      });
});

router.get('/',passport.authenticate('jwt', { session: false}),function(req, res) {

  var query   = {};
  var options = {
      sort:     { label: -1 },
      lean:     false,
      page:     parseInt(req.query.page),
      limit:    parseInt(req.query.limit)
  };

  if(req.query.brname){
    console.log("params Branch Name: "+req.query.brname);
    query.name=req.query.brname
  }
  if(req.query.brlabel){
    console.log("params Branch Label: "+req.query.brlabel);
    query.label=req.query.brlabel
  }
  if(req.query.appname){
    console.log("params Apparatus Name: "+req.query.appname);
    query.apparatus.name=req.query.appname
  }
  if(req.query.applabel){
    console.log("params Apparatus Label: "+req.query.applabel);
    query.apparatus.label=req.query.applabel
  }
  if(req.query.egname){
    console.log("params ElementGroup Name: "+req.query.egname);
    query.apparatus.elementgroup.name=req.query.egname
  }
  if(req.query.eglabel){
    console.log("params ElementGroup Label: "+req.query.eglabel);
    query.apparatus.elementgroup.label=req.query.eglabel
  }

  branch.branchmodel.paginate(query, options).then(function(result,err) {
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

router.get('/:branchid',passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid
  }, function(err, resbranch) {
    if (err) {
      console.log('ERR '+err);
      return res.status(500).json({code: 2000, msg: 'Error Generic'});
    }
    if (!resbranch) {
      console.log("Branch Not Found :"+req.params.branchid);
      res.status(404).end();
    } else {
          res.json(resbranch);
        }
      });
})


router.get('/:branchid/apparatus/:apparatusid',passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid,
    'apparatus.label': req.params.apparatusid
  }, function(err, resbranch) {
    if (err) {
      console.log('ERR '+err);
      return res.status(500).json({code: 2000, msg: 'Error Generic'});
    }
    if (!resbranch) {
      console.log("Branch Not Found :"+req.params.branchid+" "+req.params.apparatusid);
      res.status(404).end();
    } else {
          res.json(resbranch);
        }
      });
})

router.get('/:branchid/apparatus/:apparatusid/elementgroup/:elementgroupid',passport.authenticate('jwt', { session: false}),function(req, res) {
  branch.branchmodel.findOne({
    'label': req.params.branchid,
    'apparatus.label': req.params.apparatusid,
    'apparatus.elementgroups.label': req.params.elementgroupid
  }, function(err, resbranch) {
    if (err) {
      console.log('ERR '+err);
      return res.status(500).json({code: 2000, msg: 'Error Generic'});
    }
    if (!resbranch) {
      console.log("Branch Not Found :"+req.params.branchid+" "+req.params.apparatusid+" "+req.params.elementgroupid);
      res.status(404).end();
    } else {
          res.json(resbranch);
        }
      });
})

module.exports = router;
