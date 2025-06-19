const axios = require("axios");

async function fetchGA4(accessToken) {
  const propertyId = "261564405"; // GA4 demo property

  const response = await axios.post(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }, { name: "source" }],
      metrics: [{ name: "sessions" }, { name: "bounceRate" }],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}

module.exports = fetchGA4;