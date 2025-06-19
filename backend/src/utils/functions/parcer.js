const csv = require("csv-parser");
const pdfParse = require("pdf-parse");

const { Readable } = require("stream");

function parseCSV(base64Data,results) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(base64Data, "base64");

    Readable.from(buffer)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

async function parsePDF(base64Data) {
  const buffer = Buffer.from(base64Data, "base64");
  const data = await pdfParse(buffer);
  return data.text; // Returns full text of the PDF
}

module.exports = {parseCSV,parsePDF};