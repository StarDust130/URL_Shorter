const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const connectToMongoDB = require("./connect");
const URL = require("./models/url");

const app = express();
const Port = 8001;

//! Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//! Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("Connected to MongoDB 🚀");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! Routes
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: new Date(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(Port, () => console.log(`Server Started on Port ${Port} 🌟`));
