var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Url = mongoose.SchemaTypes.Url;
const uuidv4 = require('uuid/v4');

// Define schema
var Schema = mongoose.Schema;

var BranchSchema = new Schema({
            label:{
              type: String,
              required: true
            },
            name:{
              type: String,
              required: true
            },
            apparatus: [{
              label:{
                type: String,
                required: true
              },
              name:{
                type: String,
                required: true
              },
              elementgroups: [{
                label:{
                  type: String,
                  required: true
                },
                name:{
                  type: String,
                  required: true
                }
              }]
            }],
            created_at: Date,
            updated_at: Date,
            created_account: {
              type: String
            },
            updated_account: {
              type: String
            }

});

BranchSchema.plugin(mongoosePaginate);

BranchSchema.pre('save', function (next) {
  var branch = this;
  if (this.isNew) {
    branch.created_at= new Date();
    branch.updated_at= new Date();
    next();
  }
  else{
    branch.updated_at= new Date();
    next();
  }
});


// Compile model from schema
var BranchModel = mongoose.model('BranchModel', BranchSchema );
module.exports.branchmodel=BranchModel
