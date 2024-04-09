const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allURLs = await URL.find({});
    console.log(allURLs); // Log the URLs array to the console
    return res.render("home", { urls: allURLs });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});



router.get("/signup", (req, res) => {
  return res.render("signup");
});


router.get("/login", (req, res) => {
  return res.render("login");
});



module.exports = router;

