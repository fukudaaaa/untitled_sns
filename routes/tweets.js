const express = require('express');
const router = express.Router({ mergeParams: true });
const Tweet = require('../models/tweet');

router.post('/', function(req, res) {
  Tweet.create(req.body, function(err, content) {
    if (err) {
      console.log(err);
    } else {
      content.author.id = req.user._id;
      content.author.username = req.user.username;
      content.save();
      console.log(
        content.author.username + '  tweeted ' + '"' + content.content + '"'
      );
      res.send(content);
    }
  });
});

module.exports = router;
