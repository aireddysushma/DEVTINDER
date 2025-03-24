const express = require("express");
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("database connection estabilished");
    app.listen(3000, () => {
      console.log("server is successfully connected on port 3000...");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });
