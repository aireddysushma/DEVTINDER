const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://indolentnani:tkm1ZH258p3bYeec@nodeproject.f7kam.mongodb.net/devTinder")
}

module.exports = connectDB

