// routes/presensi.js

const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
// Tambahkan import dari express-validator
const { body, validationResult } = require('express-validator');

// ... (route check-in dan check-out) ...

// Rantai Validasi untuk UPDATE (PUT /:id)
const updateValidationChain = [
    // 1. Validasi checkIn: jika ada (optional), harus format ISO8601 (format tanggal standar)
    body('checkIn').optional().isISO8601().withMessage('Format checkIn harus berupa tanggal/waktu ISO 8601 yang valid.'),
    // 2. Validasi checkOut: jika ada (optional), harus format ISO8601
    body('checkOut').optional().isISO8601().withMessage('Format checkOut harus berupa tanggal/waktu ISO 8601 yang valid.'),
];

// Route UPDATE dengan middleware validasi
router.put('/:id', 
    updateValidationChain, // <-- Middleware validasi
    presensiController.updatePresensi
);

// ... (route delete) ...

module.exports = router;


