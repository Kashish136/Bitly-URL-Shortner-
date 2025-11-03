const {nanoid} = require("nanoid");
const URL = require('../models/url');
const {getUser} = require("../services/auth");  




async function handleGenerateNewShortURL(req, res) {
  try {
    const user = getUser(req.cookies?.uid);
    const body = req.body;

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!user) {
      return res.render("landing", { error: "Please log in to shorten URLs!" });
    }

    const shortID = nanoid(8);

    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: user._id,
    });

    // fetch all URLs of the logged-in user
    const urls = await URL.find({ createdBy: user._id });

    // ✅ Pass user, urls, and id (so EJS never crashes)
    return res.render("home", {
      user,
      urls,
      id: shortID,
    });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.render("home", { user: null, urls: [], id: null });
  }
}




async function handleAnalyticsOfRoute(req,res){
    
      const shortId = req.params.shortId ;
      const result = await URL.findOne({shortId});
      return res.json({totalClicks : result.visitHistory.length , analytics : result.visitHistory});
}



module.exports = {
    handleGenerateNewShortURL,
    handleAnalyticsOfRoute,
};


// as a woman u need to hustle , having a low income job 
// that at least sustains u , is better than being unemployed at all 
// u need to work on urself kashish !!!