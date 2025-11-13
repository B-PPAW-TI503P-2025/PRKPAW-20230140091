// ===== Import Module =====
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const morgan = require('morgan');

// Impor router
const presensiRoutes = require("./Routes/presensi");
const reportRoutes = require("./Routes/report");
const authRoutes = require("./Routes/auth");


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.send("Home Page for API");
});
const ruteBuku = require("./Routes/books");
app.use("/api/books", ruteBuku);
app.use("/api/presensi", presensiRoutes);
app.use("/api/presensi/report", reportRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

