const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CORRECT IMPORT
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// PLUGIN (IMPORTANT)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);