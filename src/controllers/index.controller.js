const { findById } = require("../models/user");
const User = require("../models/user");

const indexCtrl = {};

indexCtrl.renderIndex = (req, res, next) => {
  res.render("index");
};

indexCtrl.renderSignup = (req, res, next) => {
  res.render("signup");
};

indexCtrl.renderSignin = (req, res, next) => {
  res.render("signin");
};

indexCtrl.renderProfile = (req, res, next) => {
  res.render("profile");
};

indexCtrl.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

indexCtrl.renderUsers = async (req, res, next) => {
  if (req.user) {
    const { email } = req.user;
    const users = await User.find({ email: { $ne: email } });
    res.render("users", { users, userEdit: null });
  } else {
    const users = await User.find({});
    res.render("users", { users, userEdit: null });
  }
};

indexCtrl.renderUser = async (req, res, next) => {
  if (req.user) {
    const { email } = req.user;
    const users = await User.find({ email: { $ne: email } });
    const userEdit = await User.findById(req.params._id);
    res.render("users", { users, userEdit });
  } else {
    const users = await User.find({});
    const userEdit = await User.findById(req.params._id);
    res.render("users", { users, userEdit });
  }
};

indexCtrl.updateUser = async (req, res, next) => {
  const { _id, email, password } = req.body;
  const user = new User();
  await User.findByIdAndUpdate(_id, {
    email,
    password: user.encryptPassword(password),
  });
  req.flash("signinMessage", "Updated successfull");
  req.flash("statusMessage", "success");
  res.redirect("/users");
};

indexCtrl.deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  await User.findByIdAndDelete(_id);
  req.flash("signinMessage", "Deleted successfull");
  req.flash("statusMessage", "success");
  res.redirect("/users");
};

module.exports = indexCtrl;
