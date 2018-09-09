const express = require("express")
const passport = require('passport')
const router  = express.Router({mergeParams: true})

const Tweet = require("../models/tweet");
const User = require("../models/user")

router.get("/:username", async function(req,res){
  try {
    const user = await User.findByUsername(req.params.username)
    if (user === null) {
      throw "NOT FOUND"
    }
    res.render("user",{user})
  } catch (err) {
    console.log('ERROR!', err);
    // TODO: render 404 page
  }
})

router.post("/:username/follow", async function(req,res){
  // Find user model of the target user
  // Push target user id to current user followers
  // Save the current user
})

module.exports = router