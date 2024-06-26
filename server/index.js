const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const todoRoutes = require("./router/router")
const userRoutes = require("./router/userRoute")

const app = express();


app.use(express.json())

const PORT = 8080;

async function serverConnect() {
  try {
    await mongoose.connect("mongodb+srv://noxious:saad1234@cluster0.ajiuz.mongodb.net/");
    app.listen(PORT, () => {
      console.log("DB attached and running");
    });
  } catch (err) {
    console.log(err);
  }
}
serverConnect();

app.use("/api/user/", userRoutes);
app.use("/api/todos/", todoRoutes);