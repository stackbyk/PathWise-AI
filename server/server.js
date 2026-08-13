const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "../.env" });

const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get("/", (req, res) => {
  res.send("PathWise API is running...");
});

// Import Routes (To be implemented)
app.use("/api/auth", require("./routes/authRoutes"));
// app.use('/api/careers', require('./routes/careerRoutes'));
// app.use('/api/skills', require('./routes/skillRoutes'));
//app.use("/api/roadmaps", require("./routes/roadmapRoutes"));
// app.use('/api/ml', require('./routes/mlRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
