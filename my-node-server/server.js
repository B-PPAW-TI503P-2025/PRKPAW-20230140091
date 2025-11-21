// ===== Import Module =====
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const morgan = require('morgan');

// KRITIS: Impor koneksi database dan model
const db = require('./models'); 

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

// ROUTE LAMA: app.use("/api/presensi/report", reportRoutes);
// PERBAIKAN ROUTE: Mengubah base path untuk laporan
app.use("/api/reports", reportRoutes); 

app.use("/api/presensi", presensiRoutes);
app.use("/api/auth", authRoutes);


// BAGIAN KRITIS: GANTI app.listen() dengan db.sequelize.sync()
db.sequelize.sync({ force: true }) // <-- KRITIS: force: true untuk update skema tabel
    .then(() => {
        console.log('Database synced. All tables created/recreated.');
        app.listen(PORT, () => {
            console.log(`Express server running at http://localhost:${PORT}/`);
        });
    })
    .catch(err => {
        console.error('Database sync failed:', err);
    });