const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content:String,
  tweetedAt: { type: Date, default: Date.now },
  author: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  }
})

module.exports = mongoose.model("Tweet", tweetSchema);