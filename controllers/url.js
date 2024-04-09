const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerteNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url is required 🤕" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    vistHistroy: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortID,
  });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "No such short URL found 🥺" });
  }
  return res.json({
    totalClicks: result.vistHistroy.length,
    analytics: result.vistHistroy,
  });
};

module.exports = {
  handleGenerteNewShortURL,
  handleGetAnalytics,
};
