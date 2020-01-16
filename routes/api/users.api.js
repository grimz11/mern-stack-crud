const express = require("express");
const router = express.Router();

//users model
const User = require("../../models/User");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "production"
      ? "https://morning-mountain-91801.herokuapp.com"
      : "http://localhost:3000"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Origin, X-Requested-With, Content-Type, Accept");
  next();
});
``;
//Get all the users
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//Get single user
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false }));
});

//Add new User
router.post("/", (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    address: req.body.address,
    hobbies: req.body.hobbies
  });
  newUser.save().then(item => res.json(item));
});

//Delete a User
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(item =>
      item.remove().then(() => res.json({ success: true, id: req.params.id }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

//Update a user
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        address: req.body.address,
        hobbies: req.body.hobbies
      }
    },
    { new: true }
  )
    .then(item => res.json({ sucess: true, data: item }))
    .catch(err => res.status(404).json({ success: false, err }));
});

module.exports = router;
