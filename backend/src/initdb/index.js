const Data = require('../modles/data');
const data = require("./MOCK_DATA");

const connectdb = require("../initdb/connectdb");

connectdb();

const initDatabase = async () => {
  try {
    await Data.insertMany(data);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
initDatabase();