const express = require("express");

const app = express();

app.use("/hello/123", (req,res) => {
  console.log("nested hello")
})

app.use("/hello",(req,res) => {
  console.log("helloo user!")
})

app.use("/test",(req,res) => {
  console.log("testing app")
})

app.use("/", (req,res) => {
  res.send("hello from the dashboard")
})

app.listen(3000,() => {
  console.log("server is successfully connected on port 3000...")
})

