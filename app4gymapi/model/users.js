var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var records=[
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    i_account: Schema.Types.ObjectId,
    i_account_name: {
        type: String,
        unique: true,
        required: true
    },
    i_password: {
        type: String,
        required: true
    },
    a_first_name: String,
    a_last_name: String,
    d_birth_date: Date,
    a_address: String,
    a_city: String,
    d_created_at: Date,
    d_updated_at: Date
});



UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('i_password') || this.isNew) {
        console.log("encrypt pwd");
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log("error SALT");
                return next(err);
            }
            bcrypt.hash(user.i_password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.i_password = hash;
                console.log("HASH Calculated "+JSON.stringify(user.i_password));
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.i_password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

exports.findById = function(id) {
    process.nextTick(function() {
      var idx = id - 1;
      if (records[idx]) {
        return records[idx];
      } else {
        return new Object();
      }
    });
  },

exports.findByUsername = function(username) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return record;
      }
    }
    return new Object();
  });
}
// Compile model from schema
var UserModel = mongoose.model('UserModel', UserSchema );
module.exports.usermodel=UserModel
