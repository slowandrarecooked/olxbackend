const express = require("express");
const { AdModel } = require("../models/ad.model");

const browseController = express.Router();

browseController.get("/", async (req, res) => {
  const queries = req.query;
  let ads = [];
  console.log("testing");
  if (!queries.length) ads = await AdModel.find();
  if (queries.category) {
    ads.push(await AdModel.find({ category: queries.category }));
  }
  if (queries.sort) {
    if (!ads.length) ads = await AdModel.find();

    if (queries.order === "asc") {
      ads.sort((a, b) => {
        let date1 = new Date(a.postedAt);
        let date2 = new Date(b.postedAt);
        return date1 - date2;
      });
    }
    if (queries.order === "desc") {
      ads.sort((a, b) => {
        let date1 = new Date(b.postedAt);
        let date2 = new Date(a.postedAt);
        return date1 - date2;
      });
    }
  }
  if (queries.q) {
    ads = await AdModel.find({ name: { $regex: queries.q } });
  }
  if (queries.page) {
    ads = await AdModel.find()
      .skip((queries.page - 1) * 4)
      .limit(4);
  }
  res.send({ msg: ads });
});

browseController.patch("/edit/:adId", async (req, res) => {
  try {
    const { adId } = req.params;
    const update = req.body;
    console.log(adId, update);
    await AdModel.updateOne({ _id: adId }, { $set: { ...req.body } });
    res.send({ msg: "updated" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error while trying to update" });
  }
});
browseController.delete("/delete/:adId", async (req, res) => {
  try {
    const { adId } = req.params;
    await AdModel.deleteOne({ _id: adId });
    res.send({ msg: "deleted" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "error while trying to delete" });
  }
});
module.exports = {
  browseController,
};
