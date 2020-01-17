const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: String },
  address: { type: String },
  hobbies: [{ type: Array }]
});

module.exports = User = mongoose.model("user", UserSchema);
