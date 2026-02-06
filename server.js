const app = require("./src/app.js");
require("dotenv").config(); // fixed
const connectDb = require("./src/config/database.js");

const PORT = process.env.PORT || 5000;
connectDb();
app.listen(PORT, () => {
  console.log("server is running");
});
