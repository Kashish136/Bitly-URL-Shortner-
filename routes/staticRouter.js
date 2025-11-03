const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { getUser } = require("../services/auth");







// LANDING PAGE (default page for all visitors)
router.get("/", (req, res) => {
  const user = getUser(req.cookies?.uid);
  if (user) return res.redirect("/home"); // already logged in → go home
  return res.render("landing", { error: null }); // ensure 'error' always exists
});






// HOME PAGE (requires login)

router.get("/home", async (req, res) => {
  try {
    const user = getUser(req.cookies?.uid);

    if (!user) {
      // not logged in → show landing with alert message
      return res.render("landing", { error: "Please log in to generate short URLs!" });
    }

    // logged in → fetch and display URLs
    const urls = await URL.find({ createdBy: user._id });
    return res.render("home", { user, urls });
  } catch (error) {
    console.error("Error rendering home:", error);
    return res.render("home", { user: null, urls: [] });
  }
});





// SIGNUP PAGE
router.get("/signup", (req, res) => {
  return res.render("signup");
});




// LOGIN PAGE
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
