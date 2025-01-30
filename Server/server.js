const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
