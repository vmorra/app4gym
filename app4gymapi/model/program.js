
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Url = mongoose.SchemaTypes.Url;
const uuidv4 = require('uuid/v4');

// Define schema
var Schema = mongoose.Schema;

var ProgramSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        maxlength: 36
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    period:{
      type: String,
      enum: ['2017-2020', '2021-2024'],
      required: true
    },
    skills: [{
          code: {
            type: String,
            unique: true,
            required: true
          },
          name: {
              type: String,
              required: true
          },
          description: {
              type: String
          },
          difficulty: {
              type: String,
              enum: ['A', 'B','C','D','E','F','G','H'],
              required: true
          },
          value: {
              type: Number,
              min: 0.1,
              max: 5.0,
              required: true
          },
          grid_index: {
              type: String
          },
          image: {
              type: Url
          },
          video: {
              type: Url
          },
          branch:{
            label:{
              type: String,
              required: true
            },
            name:{
              type: String,
              required: true
            },
            apparatus: {
              label:{
                type: String,
                required: true
              },
              name:{
                type: String,
                required: true
              },
              elementgroup: {
                label:{
                  type: String,
                  required: true
                },
                name:{
                  type: String,
                  required: true
                }
              }
            }
          }
        }],
    publishDate: {
        type: Date,
        required: true
    },
    created_at: Date,
    updated_at: Date
});

ProgramSchema.plugin(mongoosePaginate);

ProgramSchema.pre('save', function (next) {
  var program = this;
  if (this.isModified('code') || this.isNew) {
    program.code=uuidv4();
    console.log("generated program code "+program.code);
    next();
  }
  else{
    return next();
  }
});


// Compile model from schema
var ProgramModel = mongoose.model('ProgramModel', ProgramSchema );
module.exports.programmodel=ProgramModel
