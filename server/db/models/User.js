var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of user Schema
var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  leagues: [{ type: Schema.Types.ObjectId, ref: 'League' }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
