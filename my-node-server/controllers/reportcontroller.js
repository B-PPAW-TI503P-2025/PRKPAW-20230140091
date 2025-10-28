const { Presensi } = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
  try {
    console.log("Controller: Mengambil data laporan harian dari database...");
    
    // Ambil semua record presensi hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const records = await Presensi.findAll({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      },
      order: [['createdAt', 'DESC']]
    });

    // Format data untuk response
    const formattedRecords = records.map(record => ({
      id: record.id,
      userId: record.userId,
      nama: record.nama,
      checkIn: record.checkIn ? format(record.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null,
      checkOut: record.checkOut ? format(record.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null,
      tanggal: format(record.createdAt, "yyyy-MM-dd", { timeZone })
    }));

    res.json({
      message: "Berhasil mengambil laporan harian",
      reportDate: format(today, "yyyy-MM-dd", { timeZone }),
      totalRecords: records.length,
      data: formattedRecords
    });
  } catch (error) {
    console.error('Error getting daily report:', error);
    res.status(500).json({ 
      message: "Terjadi kesalahan pada server", 
      error: error.message 
    });
  }
};
