const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../Infrastructure/Models/userModel');

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"169540758749-uui4lqp02lo7h7dn3bbvsasm9t20bhj8.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	callbackURL:"http://localhost:3000/google/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {

    User.findOne({ 'email' : profile.email }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
            return done(err);

        // if the user is found, then log them in
        
            // if there is no user found with that facebook id, create them
            if (user) {
                console.log("user found")
                console.log(user)
                return done(null, user); // user found, return that user
            } else{
            var newUser            = new User();

            // set all of the facebook information in our user model
            newUser.email = profile.emails[0].value;; // we will save the token that facebook provides to the user 
            newUser.firstName =         profile.name.givenName;       
            newUser.token = accessToken; // facebook can return multiple emails so we'll take the first    
        
            // save our user to the database
            newUser.save(function(err) {
                if (err){
                    console.log("error")
                    throw err;
                    car
                }
                console.log("user saved")
                // if successful, return the new user
                return done(null, newUser);
            });
        
        }
    });
});

}
));