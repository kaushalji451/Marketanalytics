const { google } = require("googleapis");
const express = require("express");
const oAuth2Client = require("../utils/googleAuth");
const axios = require("axios");
const googleAnalytics = express.Router();
const tokenStore = require("../utils/tokenStore");

googleAnalytics.get("/", async (req, res) => {
  try {
    const savedTokens = tokenStore.getTokens();
    if (!savedTokens) return res.status(401).send("No tokens. Please log in.");

    // Set tokens to client
    oAuth2Client.setCredentials(savedTokens);

    // Refresh access token if expired
    const { token } = await oAuth2Client.getAccessToken();

    const accessToken = token;
    const propertyId = "481669604"; // GA4 Property ID

    const response = await axios.post(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }, { name: "country" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.error("❌ GA Fetch Error:", err?.response?.data || err.message);
    res
      .status(500)
      .json(err?.response?.data || { message: "Failed to fetch GA4 data" });
  }
});

module.exports = googleAnalytics;
