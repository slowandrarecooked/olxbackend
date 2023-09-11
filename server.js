const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { AdModel } = require("./models/ad.model");
const { postController } = require("./controllers/post.controlle");
const { browseController } = require("./controllers/browse.controller");
const app = express();
app.use(express.json());
app.use("/post", postController);
app.use("/browse", browseController);
app.get("/", (req, res) => {
  res.send("BASE API ENDPOINT");
});
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server started on PORT");
  } catch (error) {
    console.log("error while connecting to DB");
    console.log(error);
  }
});
