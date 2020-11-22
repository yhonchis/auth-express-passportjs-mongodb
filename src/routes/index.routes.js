const { Router } = require("express");
const passport = require("passport");
const {
  renderIndex,
  renderSignup,
  renderSignin,
  renderProfile,
  logout,
  renderUsers,
  renderUser,
  updateUser,
  deleteUser,
} = require("../controllers/index.controller");
const router = Router();

router.get("/", renderIndex);
router.get("/signup", renderSignup);
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    passReqToCallback: true,
  })
);

router.get("/signin", renderSignin);
router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    passReqToCallback: true,
  })
);
router.post(
  "/update-profile",
  passport.authenticate("local-profile", {
    successRedirect: "/profile",
    failureRedirect: "/profile",
    passReqToCallback: true,
  })
);

router.get("/logout", logout);
router.get("/profile", isAuthenticated, renderProfile);
router.get("/users", renderUsers);
router.get("/users/:_id", renderUser);
router.post("/update-user", updateUser);
router.get("/delete/user/:_id", deleteUser);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

module.exports = router;
