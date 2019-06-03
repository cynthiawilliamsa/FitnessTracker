const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');

const User = require("../models/Users");

//@route POST api/users
//@desc Register User
//@access Public
router.post(
  "/",
  //express-validator check for each input
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "email is required")
      .isEmail(),
    check("password", "Enter a password with 6 or more characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //captures errors from express validator check in req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                    
      return res.status(400).json({ errors: errors.array() });
    }
    //gets specific info out of req.body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //creates new instance of user if user not found
      user = new User({
        name,
        email,
        password
      });
      //Encrypt password
      //creat salt with 10 rounds
      const salt = await bycrypt.genSalt(10);
      //creates hash of password
      user.password = await bycrypt.hash(password, salt);
      //returns promise so requires await
      await user.save();
      //Return jsonwebtoken to client
      //get payload
      const payload = {
        user: {
          id: user.id
        }
      };
      //assign token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
