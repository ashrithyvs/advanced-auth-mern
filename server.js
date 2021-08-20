const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
require("dotenv").config({ path: "./.env.local" });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Running on ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error :${err}`);
  server.close(() => process.exit(1));
});
