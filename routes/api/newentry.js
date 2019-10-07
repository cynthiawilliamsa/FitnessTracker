const express = require("express");
const router = express.Router();
const config = require("config");

const NewEntry = require("../models/NewEntry");

//@route POST api/newentry
//@desc Submit new form entry
//@access private

router.post(
  "/newentry",
  //express-validator check for each input
  [
    check("bmi", "BMI is required")
      .not()
      .isEmpty()
      .isLength({
        max: 2
      }),
    check("bodyfat", "Body Fat percentage is required").islenght({
      max: 2
    })
  ],
  async (req, res) => {
    //captures errors from express validator check in req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
            var newEntry = newEntry[newEntry.length-1].id+1;
            await newEntry.push({
               bmi: req.body.bmi,
               bodyFat: req.body.bodyFat
            });
            res.json({message: "New movie created.", location: "/movies/" + id});
    }
  }
);
