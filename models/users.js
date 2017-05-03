var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  name: String,
  username: String,
  password: String,
  role: String
});
var User = mongoose.model('User', usersSchema);

module.exports = User;
