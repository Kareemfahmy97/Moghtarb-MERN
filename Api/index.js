const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
// const PlaceModel = require('.')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
const photosMiddleWare = multer({ dest: "uploads" });

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use()
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.get("/test", (req, res) => {
  res.json("test ok");
});

//Password
mongoose.connect(process.env.MONGO_URL);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDocument = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json(userDocument);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDocument = await UserModel.findOne({ email });

  if (userDocument) {
    const currentUser = {
      email: userDocument.email,
      id: userDocument._id,
      name: userDocument.name,
    };
    const passIsCorrect = bcrypt.compareSync(password, userDocument.password);
    if (passIsCorrect) {
      jwt.sign(currentUser, process.env.jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.status(200).cookie("token", token).json(currentUser);
      });
    } else {
      res.status(422).json("password is wrong!");
    }
  } else {
    res.status(422).json("Email not found!");
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(498).json("Not accepted");
      } else {
        const { name, email, _id } = await UserModel.findById(userData.id);
        res.json({ name, email, _id });
      }
    });
  } else {
    res.status(401).json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-img-link", async (req, res) => {
  const { link } = req.body;
  const newImgTitle = `pic${Date.now()}.jpg`;
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newImgTitle,
  });
  res.json(newImgTitle);
});

app.post("/upload", photosMiddleWare.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const nameSplittedArr = originalname.split(".");
    const imgExt = nameSplittedArr[nameSplittedArr.length - 1];
    const newPath = `${path}.${imgExt}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  // for (let i = 0; i < req.files.length; i++) {
  //   const { path, originalname } = req.photoFiles[i];
  //   const parts = originalname.split(".");
  //   const ext = parts[parts.length - 1];
  //   fs.renameSync(path, newPath);
  //   uploadedFiles.push(newPath);
  // }

  // res.json(uploadedFiles);
  console.log(uploadedFiles);
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {});

app.listen(4000);
