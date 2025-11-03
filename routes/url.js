const express = require('express');

const {handleAnalyticsOfRoute} =  require("../controllers/url");
const{handleGenerateNewShortURL} = require("../controllers/url");

const router = express.Router();
// this line  creates a router object , which creates a mini version
// of ur express app


// now learning how to route the paths for 
// for handling the urls

router.post("/" , handleGenerateNewShortURL ); // it indicates that when a ost request comes 
// to '/' ( like /url) , we need to execute the function , handleGenerateNewShortUrl

router.get("/analytics/:shortId" , handleAnalyticsOfRoute );

module.exports = router;
