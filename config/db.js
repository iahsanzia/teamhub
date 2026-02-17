const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  `<PASSWORD>`,
  process.env.DATABASE_PASSWORD,
);

module.exports = async () => {
  try {
    const connection = await mongoose.connect(DB);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};
