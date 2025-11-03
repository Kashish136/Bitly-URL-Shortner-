const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect");
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require('./middlewares/auth');
const app = express();
const PORT = 8002;
require('dotenv').config();
const userRoute = require("./routes/user");

console.log("🔍 MONGO_URL:", process.env.MONGO_URL);

connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("🌿 Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection Failed ❌", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 🔒 Protect URL creation route
// ✅ Correct order
app.use("/user", userRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", staticRoute);


// 🔗 Redirect short URLs
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) return res.status(404).send("Short URL not found ❌");

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error in redirect route:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`🚀 Server started at PORT NO. ${PORT}`));
