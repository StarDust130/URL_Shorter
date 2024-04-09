const express = require("express");
const {
  handleGenerteNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerteNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

