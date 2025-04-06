const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user.js");
const userRouter = express.Router();
const user_safe_data = "firstName lastName photoURL emailId about age gender";

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", user_safe_data);
    if (!connectionRequest) {
      res.status(400).json({ message: "no connection request!!!" });
    }
    res.json({ message: "Data fetched successfully", connectionRequest });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: user._id, status: "accepted" },
        { toUserId: user._id, status: "accepted" },
      ],
    })
      .populate("toUserId", user_safe_data)
      .populate("fromUserId", user_safe_data);
    const data = connectionRequests.map((val) => {
      if (val.toUserId._id.toString() === user._id.toString()) {
        return val.fromUserId;
      }
      return val.toUserId;
    });
    res.json({ message: "Data fetched successfully", data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const limitCheck = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limitCheck;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    const hideUserFromFeed = new Set();
    connectionRequests.forEach((val) => {
      hideUserFromFeed.add(val.fromUserId.toString());
      hideUserFromFeed.add(val.toUserId.toString());
    });
    const data = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(user_safe_data)
      .skip(skip)
      .limit(limit);
    res.send(data);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
