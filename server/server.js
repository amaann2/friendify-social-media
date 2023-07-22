require("dotenv").config({ path: "./config.env" });

const app = require("./app");
const { connectToDb } = require("./config/db");

connectToDb();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} at ${process.env.NODE_ENV} mode`);
});
