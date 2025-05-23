const express = require("express");
const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieparser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter)

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
