
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../../model/usermodel');



passport.use(new GoogleStrategy(

    // configure the strategy options
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
        // scope: ['profile', 'email'],
        passReqToCallback   : true
    },
    // set-up the strategy callBack function
    async (req, accessToken, refreshToken, profile, done) => {
        
        try {
            // const user = profile.id;
            console.log(`profile.id: ${profile.id}`)
            console.log(`profile.displayName: ${profile.displayName}`)
            console.log(`profile.picture: ${profile.picture}`)
            console.log(`profile.emails: ${profile.emails[0].value}`)

            // CHECK IF USER DATA ALREADY EXISTS IN DATABASE (USING USER's GOOGLE ID)
            // let existingUser = await User.findOne({ google_ID: profile.emails[0].value });
            let existingUser = await User.findOne({ google_ID: profile.id });
            if (existingUser){
                return done(null, profile);   
            }

            // CREATE NEW ACCOUNT IF SUCH RECORD DOESN'T EXIST
            let newUser = new User({
                google_ID: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                img_url: profile.picture
            });

            newUser.save()
            done(null, profile);

        } catch (error) {
            console.log(error)
            // done(error, false);
        }

        
    }
));


// passport serialize AND deserialize
passport.serializeUser((user, done)=>{
    done(null, user);
});
passport.deserializeUser((user, done)=>{
    done(null, user);
});

