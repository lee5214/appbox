const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/credentials");
// special import style in mongoose in case you import multiple models
// this schema is defined in /models
require("../models/Users_Model");
const User = mongoose.model("Users_Model");

module.exports = () => {
  // user here is either existingUser or user in the promises below
  // oauth's purpose is allowing someone to sign in
  // then I use its own id saved in db
  passport.serializeUser((user, done) => {
    // this is id in db
    // for multiple social accounts sign in
    console.log("serializeUser=> ", user);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserializeUser id=> ", id);
    User.findById(id).then(user => {
      done(null, user);
    });
  });

  passport.use(
    "local-register",
    new LocalStrategy(
      {
        // only username & password allowed by default
        // add this option to allow modify req, so that we could use req.body in this strategy
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        await User.findOne({ "local.username": username }, async function(
          err,
          registerUser
        ) {
          if (err) {
            return done(err);
          }
          if (registerUser) {
            return done(null, false, { message: "Username already exist" });
          }
          const user = await new User({
            local: {
              username: username,
              password: password,
              displayName: username,
              avatar: req.body.avatar
            }
          }).save();
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      await User.findOne({ "local.username": username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.local.password === password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    })
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: keys.google.googleClientID,
        clientSecret: keys.google.googleClientSecret,
        callbackURL: "/auth/google/callback"
      },
      // refactor promise using async/await
      async (accessToken, refreshToken, profile, done) => {
        // IMPORTANT ''
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          // (error, user record)
          done(null, existingUser);
        } else {
          const user = await new User({
            local: {
              email: profile.emails[0].value,
              displayName: profile.displayName,
              avatar: profile.photos[0].value
            },
            google: profile._json
          }).save();
          // call done() after user is saved in db
          // (error, user record)
          done(null, user);
        }

        // this returns a promise
        // User.findOne ({googleID : profile.id})
        // 	.then ((existingUser) => {
        // 		// if no existing user found, insert new record
        // 		if (existingUser) {
        // 			// (error, user record)
        // 			done (null, existingUser);
        // 		}
        // 		else {
        // 			new User ({googleID : profile.id,})
        // 				.save ()
        // 				// call done() after user is saved in db
        // 				.then ((user) => {
        // 					// (error, user record)
        // 					done (null, user);
        // 				});
        // 		}
        // 	});
      }
    )
  );

  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: keys.facebook.facebookAppID,
        clientSecret: keys.facebook.facebookAppSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: [
          "id",
          "birthday",
          "email",
          "first_name",
          "picture",
          "cover",
          "locale",
          "timezone",
          "updated_time"
        ]
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          existingUser.local.avatar = profile.photos[0].value || "";
          await existingUser.save(function(err) {
            console.log(err);
          });
          done(null, existingUser);
        } else {
          const user = await new User({
            local: {
              email: profile.emails[0].value,
              // firstName : profile.first_name,
              displayName: profile._json.first_name,
              avatar: profile.photos[0].value || "",
              language: profile._json.local
            },
            facebook: profile._json
          }).save();
          done(null, user);
        }
      }
    )
  );
};
