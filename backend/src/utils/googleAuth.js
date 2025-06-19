const fs = require("fs");
const { google } = require("googleapis");

const base64Credentials = process.env.GOOGLE_CREDS_BASE64;

const credentialsJSON = JSON.parse(
  Buffer.from(base64Credentials, "base64").toString()
);

const { client_secret, client_id, redirect_uris } =
  credentialsJSON.installed || credentialsJSON.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

module.exports = oAuth2Client;
