const {v4: uuidv4} = require("uuid");
const User = require('../models/user');
const {setUser} = require('../services/auth');







async function handleUserSignup(req,res){
   try{ const {name , email , password } = req.body;

     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered 🚫" });
    }
    await User.create({
        name , 
        email , 
        password,
    });

    return res.render("login");
}catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", { error: "Something went wrong. Try again!" });
  }}







async function handleUserLogin(req,res){

    try{
    const {email , password } = req.body;
   const user = await User.findOne({ email , password});
   if(!user) return res.render("login" , {
    error : "Invalid Username or Password",
   }); 

   if (user.password !== password) {
      return res.render("login", { error: "Incorrect password!" });
    }
    
   const sessionId = uuidv4();
   setUser(sessionId , user);
   res.cookie('uid' , sessionId);
    return res.redirect("/");}catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "Something went wrong. Try again!" });
  }
}






module.exports = {
    handleUserSignup,
    handleUserLogin,
};