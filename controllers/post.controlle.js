const express = require("express");
const { AdModel } = require("../models/ad.model");
const postController = express.Router();

postController.post("/", (req, res) => {
  try {
    const ad = req.body;
    const newad = new AdModel(ad);
    newad.save();
    res.send({ msg: "ad added" });
  } catch (error) {
    res.send({ msg: "error while adding add" });
    console.log(error);
  }
});
module.exports = {
  postController,
};
