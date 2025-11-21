const { Presensi } = require('../models');
const { Op } = require('sequelize'); // Diperlukan untuk perbandingan tanggal

exports.checkIn = async (req, res) => {
    const userId = req.user.id; // Ambil dari token

    try {
        // --- LOGIKA VALIDASI CHECK-IN GANDA DITAMBAHKAN ---

        // 1. Cek apakah ada entri Presensi hari ini yang belum Check-Out
        const existingPresensi = await Presensi.findOne({
            where: {
                userId: userId,
                checkOut: null // Belum Check-Out
            }
        });

        if (existingPresensi) {
            // Jika ada, kembalikan error 400
            return res.status(400).json({ message: 'Anda sudah Check-In dan belum Check-Out.' });
        }

        // 2. Jika validasi lolos, buat entri baru
        const presensi = await Presensi.create({ userId, checkIn: new Date() });
        return res.status(201).json({ message: 'Check-In berhasil!', presensi });

    } catch (error) {
        console.error("Check-In Error (Mahasiswa Gagal):", error);
        // Penting: Kembalikan pesan error yang lebih jelas di log
        return res.status(500).json({ message: 'Gagal melakukan Check-In. Cek log server.' });
    }
};

exports.checkOut = async (req, res) => {
    const userId = req.user.id; // Ambil dari token
    // ... (Logika validasi check-out sudah benar) ...
    try {
        const presensi = await Presensi.findOne({ where: { userId, checkOut: null }, order: [['checkIn', 'DESC']] });

        if (!presensi) {
            return res.status(400).json({ message: 'Anda belum melakukan Check-In hari ini.' });
        }

        await presensi.update({ checkOut: new Date() });
        return res.status(200).json({ message: 'Check-Out berhasil!', presensi });

    } catch (error) {
        console.error("Check-Out Error:", error);
        return res.status(500).json({ message: 'Gagal melakukan Check-Out. Cek log server.' });
    }
};