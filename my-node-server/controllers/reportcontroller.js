// controllers/reportcontroller.js

const { Presensi } = require('../models');
const { Op } = require('sequelize'); 
const { format } = require('date-fns-tz'); // Pastikan Anda sudah 'npm install date-fns-tz'
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
    try {
        const { nama, tanggalMulai, tanggalSelesai } = req.query; 
        
        let options = {
            where: {},
            order: [['checkIn', 'DESC']]
        };

        // Filtering berdasarkan Nama
        if (nama) {
            options.where.nama = {
                [Op.like]: `%${nama}%`,
            };
        }

        // Filtering berdasarkan Rentang Tanggal
        if (tanggalMulai && tanggalSelesai) {
            // Logika menambahkan 1 hari pada tanggal selesai agar mencakup seluruh hari itu
            const endDate = new Date(tanggalSelesai);
            endDate.setDate(endDate.getDate() + 1); 

            options.where.checkIn = {
                [Op.between]: [
                    new Date(tanggalMulai),
                    endDate 
                ]
            };
        }
        
        const records = await Presensi.findAll(options);

        // Memformat data yang diambil
        const formattedReport = records.map(record => ({
            userId: record.userId,
            nama: record.nama,
            // Menggunakan format date-fns-tz
            checkIn: format(record.checkIn, "yyyy-MM-dd HH:mm:ss", { timeZone }),
            checkOut: record.checkOut ? format(record.checkOut, "yyyy-MM-dd HH:mm:ss", { timeZone }) : 'N/A'
        }));

        res.status(200).json({
            message: "Laporan presensi berhasil diambil.",
            count: formattedReport.length,
            data: formattedReport
        });

    } catch (error) {
        // Log error di konsol server untuk debugging
        console.error("Gagal mengambil laporan:", error);
        res.status(500).json({ message: "Gagal mengambil laporan", error: error.message });
    }
};