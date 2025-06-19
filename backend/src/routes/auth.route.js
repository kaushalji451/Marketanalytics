// /server/routes/auth.js
const express = require("express");
const oAuth2Client = require("../utils/googleAuth");
const tokenStore = require("../utils/tokenStore");
const authRouter = express.Router();
const { google } = require("googleapis");
const axios = require("axios");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

authRouter.get("/", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "openid",
    ],
  });
  res.redirect(url);
});

// server/routes/auth.js

const jwt = require("jsonwebtoken");

authRouter.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) return res.status(400).send("Missing authorization code");

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

     // ✅ Get user info from Google
    const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const userInfo = userInfoResponse.data;
    const email = userInfo.email;

    // ✅ Create a JWT with email and Google ID (or custom payload)
    const token = jwt.sign(
      { email, sub: userInfo.sub },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

     res.cookie("token", token, {
      httpOnly: false, // frontend-readable
      secure: false, // true for production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.cookie("email", email, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    console.error("❌ Error during Gmail auth callback:", error);
    res.status(500).redirect("http://localhost:5173/login");
  }
});

module.exports = authRouter;
