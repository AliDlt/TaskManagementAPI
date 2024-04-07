const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const db = require("./configs/db");

const port = process.env.PORT || 5500;

// Use Morgan middleware for logging requests
app.use(morgan("tiny"));

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

//* Database connection
db.connectDB();

// Routes
app.use(require("./routes/taskRoute"));
app.use(require("./routes/authRoute"));

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ error: "آدرس یافت نشد." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
