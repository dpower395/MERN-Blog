const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async function(req, res){
  // make sure user is updating their own account (params looks at url?)
  if(req.body.userId === req.params.id) {
    // if they're updating their password we need to hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // update user's information
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        // this made it so the change showed up in postman
        {new:true}
      );
      res.status(200).json(updatedUser);
    } catch(err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Not your account!");
  }
});

//DELETE
router.delete("/:id", async function(req, res){
  // make sure user is deleting their own account (params looks at url?)
  if(req.body.userId === req.params.id) {
    // make sure the user actually exists
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          // delete user's posts
          await Post.deleteMany({ username: user.username });
          // delete the user
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted User!");
        } catch(err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("User Not Found!");
      }
    } catch(err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Not your account!");
  }
});

//GET USER
router.get("/:id", async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const {password, ...everythingElse} = user._doc;
    res.status(200).json(everythingElse);
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
