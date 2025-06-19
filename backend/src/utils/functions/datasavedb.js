const Data = require("../../modles/data");

const saveDataToDB = async (data) => {
  console.log("Saving data to database:", data);
  console.log(data[0].attachments);
  console.log(data[1].attachments);

  const parsedResults = [];

  for (const item of data) {
    const attachments = item.attachments || [];

    for (const file of attachments) {
      const lines = file.data.split("\n");
      const result = {};

      lines.forEach((line) => {
        const match = line.trim().match(/^([\w_]+)\s*[-:]\s*(.+)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          result[key] = value; // keep values as strings
        }
      });

      parsedResults.push(result);
    }
  }

  console.log("Parsed results:", parsedResults);

  for (const entry of parsedResults) {
    const { platform, date } = entry;

    if (!platform || !date) {
      console.log("Skipping entry due to missing platform or date:", entry);
      continue;
    }

    const existing = await Data.findOne({
      $and: [{ platform: entry.platform }, { date: entry.date }],
    });

    if (existing) {
      console.log(
        `Record already exists for platform: ${existing}`
      );
      continue;
    }

    try {
      await Data.create(entry);
      console.log(
        `✅ Saved new entry for platform: ${platform}, date: ${date}`
      );
    } catch (err) {
      console.error("❌ Error saving entry to DB:", err);
    }
  }
};

module.exports = saveDataToDB;
