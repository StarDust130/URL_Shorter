const mongoose = require("mongoose");
const { unique } = require("next/dist/build/utils");
const { redirect } = require("next/dist/server/api-utils");

//! Create a new schema for our url data
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);


const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
