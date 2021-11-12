const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

// connect to database
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// parser
app.use(express.json());

//makes image folder public?
app.use("/images", express.static(path.join(__dirname,"/images")));

// image storage
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"images");
  },
  filename:(req,file,cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
  res.status(200).json("File uploaded!");
});

// url routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

// server channel
app.listen("5000", function(){
  console.log("Server running!");
});
