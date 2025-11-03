const express = require("express");
const router = express.Router();

const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const { getUser } = require("../services/auth");

// 🏠 HOME page (only for logged-in users)
router.get("/home", async (req, res) => {
  const user = getUser(req.cookies?.uid); // decode cookie
  if (!user) {
    // not logged in
    return res.render("landing", { error: "Please log in to access your dashboard!" });
  }

  // user logged in → show home
  return res.render("home", { user, urls: [] });
});

// 📝 SIGNUP PAGE
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

// 🔐 LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// 🧾 HANDLE SIGNUP
router.post("/", async (req, res) => {
  await handleUserSignup(req, res); // your controller will redirect
});

// 🔑 HANDLE LOGIN
router.post("/login", async (req, res) => {
  await handleUserLogin(req, res); // sets cookie, redirects to /home
});


// handle logout

router.post("/logout", (req, res) => {
  res.clearCookie("uid"); // remove the session cookie
  return res.redirect("/"); // redirect to login page
});
module.exports = router;
