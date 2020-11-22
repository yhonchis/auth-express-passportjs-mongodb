const express = require("express");
const morgan = require("morgan");
const engine = require("ejs-mate");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

//Initializations
const app = express();
require("./database");
require("./passport/local-auth");

//Middlewares
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretsessions",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.status = req.flash("statusMessage");

  app.locals.user = req.user;
  next();
});

//Settings
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

//Routes
const index = require("./routes/index.routes");
app.use(index);

//Starting the server
app.listen(app.get("port"), (err) => {
  if (err) throw new Error("Error: ", err);
  console.log(`Server on port http://localhost:${app.get("port")}`);
});
