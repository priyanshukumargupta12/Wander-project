const User = require("../models/user");



module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};



module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body; //We are extracting the username, email, password from the signup form
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome TO Wander!");
            res.redirect("/listings");
        } );
      
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
   
};



module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};




module.exports.login = async(req, res) => {
    try {
        let { username, password } = req.body; //We are extracting the username, email, password from the signup form
        req.flash("success", "Welcome Back!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/login");
    }
   
};




module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "You Logged Out Successfully!");
        res.redirect("/listings");
    })

};



