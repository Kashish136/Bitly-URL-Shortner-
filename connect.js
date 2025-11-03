const mongoose = require("mongoose");

async function connectToMongoDB(MONGO_URL) {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

module.exports = { connectToMongoDB };



// we need to render our backend to the frontend side also 
// and for this purpose we need to have html and css codes , using 
// them directly in the index.js file 
// is quite complex ,therfore we are required to have a 
//server side rendering program , for which we can use template engines 
// and such template engines make it easy to render programs 
// for example ejs 