const express = require("express");
const router = express.Router();
const bycrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

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

  //post login
  postUser: router.post("/", (req, res) => {
    const { email, password } = req.body;

    // If no email,password provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    //check for existing email
    UserAuth.findOne({ email }).then(user => {
      if (!user) return res.status(400).json({ msg: "User does exist" });

      //validate password
      bycrypt.compare(password, user.password).then(isMatched => {
        if (!isMatched)
          return res.status(400).json({ msg: "Invalid Credentials" });

        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: { id: user.id, email: user.email },
              msg: "Successfuly login!"
            });
          }
        );
      });
    });
  }),

  //validated get user
  getUser: router.get("/", auth, (req, res) => {
    UserAuth.findById(req.user.id)
      .select("-password")
      .then(user => res.json(user));
  })
};

module.exports = router;
