// /server/routes/auth.js
const express = require("express");
const data = require("../initdb/MOCK_DATA");
const analyticsRouter = express.Router();
const Data = require("../modles/data");

analyticsRouter.get("/", async (req, res) => {
  try {
    const data = await Data.find({}).sort({ date: -1 });
    // console.log("Fetched analytics data:", data);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No analytics data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = analyticsRouter;
