const express = require("express");
const router = express.Router()
const Spa = require("../models/spa");

// spa

router.post("/addspa", async (req, res) => {
  try {
    const spa = await Spa.create(req.body);
    res.status(200).json(spa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all spa details
router.get("/allSpaList", async (req, resp) => {
  const spaList = await Spa.find();
  try {
    if (spaList) {
      resp.json({ success: true, data: spaList });
    } else {
      resp.json({ success: false, data: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//get details of spa

router.get("/spaDetails/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  try {
    const dataDetails = await Spa.findOne({ _id: id });
    if (dataDetails) {
      console.log(dataDetails);
      resp.json({ success: true, data: dataDetails });
    } else {
      resp.status(404).json({ success: false, data: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    resp.status(500).json({ success: false, data: "Internal Server Error" });
  }
});


module.exports = router;