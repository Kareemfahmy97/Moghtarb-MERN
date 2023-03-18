const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use(cookieParser());
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
    const passIsCorrect = bcrypt.compareSync(password, userDocument.password);
    if (passIsCorrect) {
      jwt.sign(
        {
          email: userDocument.email,
          id: userDocument._id,
          name: userDocument.name,
        },
        process.env.jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          res.status(200).cookie("token", token).json("Successfully");
        }
      );
      //   res.sta tus(200).json("password correct && mail good ");
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
      if (!err) {
        const { name, email, _id } = await UserModel.findById(userData.id);
        res.json({ name, email, _id });
      } else {
        res.status(498).json("Not accepted");
      }
    });
  } else {
    res.status(401).json("Failed");
  }
});

app.listen(4000);
