const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

//connect to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
