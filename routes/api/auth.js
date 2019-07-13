const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

//@route GET api/auth
//@desc Test Route
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/auth
//@desc Authenticate user & get token
//@access Public
router.post(
    "/",
    //express-validator check for each input
    [     
      check("email", "Email is required").exists(),
      check("password", "Password is required").exists()
    ],
    async (req, res) => {
      //captures errors from express validator check in req
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //gets specific info out of req.body
      const { email, password } = req.body;
      console.log(email, password)
  
      try {
        let user = await User.findOne({ email });
        //see if user exists
        if (!user) {
          console.log("47")
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("passwords", isMatch)
        if(!isMatch) {
            return res
            .status(400)
            .json({errors: [{msg: "Invalid credentials"}]})
        }

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
            console.log(token)
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
