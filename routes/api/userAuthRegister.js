const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//userAuth model
const UserAuth = require("../../models/UserAuth");

const func = {
  checkCors: router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Origin, X-Requested-With, Content-Type, Accept");
    next();
  }),

  isNull: () => null,

  //register post
  getUsers: router.post("/", (req, res) => {
    const { name, email, password } = req.body;

    // If no name,email,password provided
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    //check for existing email
    UserAuth.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: "User already exist" });
      const newUserAuth = new UserAuth({
        name,
        email,
        password
      });
      //create salt & hash
      bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newUserAuth.password, salt, (err, hash) => {
          if (err) throw err;
          newUserAuth.password = hash;
          newUserAuth.save().then(user =>
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: { id: user.id, name: name.name, email: user.email },
                  msg: "Successfuly registered!"
                });
              }
            )
          );
        });
      });
    });
  })
};

module.exports = router;
