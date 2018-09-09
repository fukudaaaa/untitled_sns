const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  followers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);