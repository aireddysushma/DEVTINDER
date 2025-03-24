const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token")
    }
    const decodeMsg = await jwt.verify(token, "sushma@123")
    const { _id } = decodeMsg;
    const user = await User.findById(_id)
    if (!user) {
      throw new Error("user not found")
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR " + err.message)
  }
}

module.exports = { userAuth }