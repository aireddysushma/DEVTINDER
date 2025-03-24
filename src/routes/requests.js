const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  res.send("connection request sent");
});

module.exports = requestRouter;