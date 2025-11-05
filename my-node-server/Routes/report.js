// routes/report.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportcontroller'); // Pastikan path benar
const { addUserData, isAdmin } = require('../middleware/permissionMiddleware'); // Pastikan fungsi di file ini diekspor

// Endpoint untuk mendapatkan laporan harian
// KOREKSI: Menggunakan '/daily' agar sesuai dengan URL yang diminta di Postman
router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);

module.exports = router; // <-- HARUS ADA