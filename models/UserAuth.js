const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const UserAuthSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registered_date: { type: Date, default: Date.now, required: true }
});

module.exports = UserAuth = mongoose.model("userAuth", UserAuthSchema);
