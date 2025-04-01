const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validator");
const validator = require("validator");
const bcrypt = require("bcrypt")

//profile view API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  console.log("error");
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//profile Edit API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((val) => (loggedInUser[val] = req.body[val]));
    await loggedInUser.save();
    res.json({ message: "data updated successfully!!!", data: loggedInUser });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

//password change Api
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const newPassword = req.body.password;
     if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Please enter a strong password");
    }
    user.password = await bcrypt.hash(newPassword,10);
    await user.save();
    res.send("password updated successfully!!!")
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
