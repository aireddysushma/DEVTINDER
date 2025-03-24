const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validator")

//profile view API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  console.log("error")
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

//profile Edit API
profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
  try {
    if(!validateProfileData(req)) {
      throw new Error("Invalid edit request")
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach( val =>( loggedInUser[val] = req.body[val]))
    await loggedInUser.save()
    res.json({message : "data updated successfully!!!", data: loggedInUser})
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

module.exports = profileRouter;