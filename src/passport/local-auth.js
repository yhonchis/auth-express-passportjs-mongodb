const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//Verficacion de registro y auth de usuario
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (user) {
        done(
          null,
          false,
          req.flash(
            "signupMessage",
            "The email is alredy take",
            req.flash("statusMessage", "danger")
          )
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

//Verrificacion de auth de usuario
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(
          null,
          false,
          req.flash("signinMessage", "No user found"),
          req.flash("statusMessage", "danger")
        );
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash(
            "signinMessage",
            "Incorrect password",
            req.flash("statusMessage", "danger")
          )
        );
      }
      done(null, user);
    }
  )
);

//Update profile from user
passport.use(
  "local-profile",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findByIdAndUpdate(req.user._id, {
        email,
        password: req.user.encryptPassword(password),
      });
      if (!user) {
        return done(
          null,
          false,
          req.flash("signinMessage", "No updated"),
          req.flash("statusMessage", "success")
        );
      }
      done(null, user, req.flash("signinMessage", "The updated is succesfull"));
    }
  )
);
