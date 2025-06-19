const { google } = require("googleapis");
const express = require("express");
const { convert } = require("html-to-text");
const oAuth2Client = require("../utils/googleAuth");
const { parseCSV, parsePDF }  = require("../utils/functions/parcer")
const gmailRouter = express.Router();
const saveDataToDB = require("../utils/functions/datasavedb");
const dotenv = require("dotenv");
dotenv.config();
gmailRouter.get("/", async (req, res) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const response = await gmail.users.messages.list({
      userId: "me",
      q: `subject:\`${process.env.GMAIL_SUBJECT}\``,
    });

    const messages = response.data.messages || [];
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching emails");
  }
});

gmailRouter.post("/details", async (req, res) => {
  console.log("Received request to process emails:", req.body);
  try {
    const messages = req.body.emails; // [{id, threadId}, ...]
    console.log("Received messages:", req.body);

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const results = [];

    for (const msg of messages) {
      const id = msg.id;
      const result = await gmail.users.messages.get({
        userId: "me",
        id,
      });

      const message = result.data;
      const headers = message.payload.headers;

      const subject = headers.find((h) => h.name === "Subject")?.value;
      const from = headers.find((h) => h.name === "From")?.value;

      let body = "";

      const extractPlainText = (parts) => {
        for (const part of parts) {
          if (part.mimeType === "text/plain" && part.body.data) {
            return Buffer.from(part.body.data, "base64").toString("utf-8");
          } else if (part.parts) {
            const nested = extractPlainText(part.parts);
            if (nested) return nested;
          }
        }
        return "";
      };

      if (message.payload.mimeType === "text/plain") {
        body = Buffer.from(message.payload.body.data, "base64").toString("utf-8");
      } else if (message.payload.parts) {
        body = extractPlainText(message.payload.parts);
      }

      // Fallback to HTML
      if (!body && message.payload.parts) {
        const htmlPart = message.payload.parts.find((p) => p.mimeType === "text/html");
        if (htmlPart?.body?.data) {
          const html = Buffer.from(htmlPart.body.data, "base64").toString("utf-8");
          body = convert(html, {
            wordwrap: 130,
            selectors: [{ selector: "a", options: { ignoreHref: true } }],
          });
        }
      }

      const attachments = [];
      const parts = message.payload.parts || [];

      for (const part of parts) {
        if (part.filename && part.body?.attachmentId) {
          const attachment = await gmail.users.messages.attachments.get({
            userId: "me",
            messageId: id,
            id: part.body.attachmentId,
          });

          const data = attachment.data.data;
          const mimeType = part.mimeType;

          if (mimeType === "text/csv") {
            const resultsCSV = [];
            await parseCSV(data, resultsCSV);

            attachments.push({
              type: "csv",
              filename: part.filename,
              data: resultsCSV,
            });
          } else if (mimeType === "application/pdf") {
            const pdfText = await parsePDF(data);
            attachments.push({
              type: "pdf",
              filename: part.filename,
              data: pdfText,
            });
          }
        }
      }

      const emailData = { id, subject, from, body, attachments };

      // Optional: Save to DB
      // await Email.create(emailData);

      results.push(emailData);
    }


    // console.log("Processed messages:", results);
    saveDataToDB(results);
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to process messages");
  }
});


module.exports = gmailRouter;
