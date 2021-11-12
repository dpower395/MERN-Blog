const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async function(req, res){
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch(err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async function(req, res){
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
          {$set:req.body},
          {new:true}
        );
        res.status(200).json(updatedPost);
      } catch(err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Not your post!");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async function(req, res){
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post deleted!");
      } catch(err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Not your post!");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch(err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async function(req, res) {
  // this section is reading the query in the url, i.e. /?name="john"
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    // if the user is searching for posts from another user
    if (username) {
      posts = await Post.find({username});
    // else if they are searching for posts in a category
    } else if (catName) {
      posts = await Post.find({categories:{
        $in:[catName]
      }})
    // else just give them everything
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
