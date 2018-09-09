const express = require("express")
const passport = require('passport')
const router  = express.Router({mergeParams: true})

const Tweet = require("../models/tweet");
const User = require("../models/user")

router.get("/:username", function(req,res){
  console.log(req.params.username);
  User.findOne({username:req.params.username})
  .then(function(user){
    console.log(user);
    res.render("user",{user})
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router