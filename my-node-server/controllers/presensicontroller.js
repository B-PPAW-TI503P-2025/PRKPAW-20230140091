 	// 1. Ganti sumber data dari array ke model Sequelize
 	const { Presensi } = require("../models");
 	const { format } = require("date-fns-tz");
 	const timeZone = "Asia/Jakarta";
	const { validationResult } = require('express-validator');
 	
 	exports.CheckIn = async (req, res) => {
 	  // 2. Gunakan try...catch untuk error handling
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // 3. Ubah cara mencari data menggunakan 'findOne' dari Sequelize
 	    const existingRecord = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (existingRecord) {
 	      return res
 	        .status(400)
 	        .json({ message: "Anda sudah melakukan check-in hari ini." });
 	    }
 	
 	    // 4. Ubah cara membuat data baru menggunakan 'create' dari Sequelize
 	    const newRecord = await Presensi.create({
 	      userId: userId,
 	      nama: userName,
 	      checkIn: waktuSekarang,
 	    });
 	    
 	    const formattedData = {
 	        userId: newRecord.userId,
 	        nama: newRecord.nama,
 	        checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: null
 	    };
 	
 	    res.status(201).json({
 	      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};
 	
 	exports.CheckOut = async (req, res) => {
 	  // Gunakan try...catch
 	  try {
 	    const { id: userId, nama: userName } = req.user;
 	    const waktuSekarang = new Date();
 	
 	    // Cari data di database
 	    const recordToUpdate = await Presensi.findOne({
 	      where: { userId: userId, checkOut: null },
 	    });
 	
 	    if (!recordToUpdate) {
 	      return res.status(404).json({
 	        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
 	      });
 	    }
 	
 	    // 5. Update dan simpan perubahan ke database
 	    recordToUpdate.checkOut = waktuSekarang;
 	    await recordToUpdate.save();
 	
 	    const formattedData = {
 	        userId: recordToUpdate.userId,
 	        nama: recordToUpdate.nama,
 	        checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	        checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
 	    };
 	
 	    res.json({
 	      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
 	        waktuSekarang,
 	        "HH:mm:ss",
 	        { timeZone }
 	      )} WIB`,
 	      data: formattedData,
 	    });
 	  } catch (error) {
 	    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
 	  }
 	};

	// Delete presensi by id (only owner can delete)
	exports.DeletePresensi = async (req, res) => {
		try {
			const userId = req.user && req.user.id;
			const presensiId = req.params.id;
			const recordToDelete = await Presensi.findByPk(presensiId);
			if (!recordToDelete) {
				return res.status(404).json({ message: "Data presensi tidak ditemukan." });
			}
			if (recordToDelete.userId !== userId) {
				return res.status(403).json({ message: "Anda tidak memiliki izin untuk menghapus data ini." });
			}
			await recordToDelete.destroy();
			res.json({ message: "Data presensi berhasil dihapus." });
		} catch (error) {
			res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
		}
	};

	// presensiController.js

// ... (import di awal file, termasuk { validationResult } jika Anda pindahkan ke sini) ...

exports.updatePresensi = async (req, res) => {
    try {
        // 1. Cek Hasil Validasi dari express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validasi Gagal.",
                errors: errors.array() 
            });
        }
        
        const presensiId = req.params.id;
        const { checkIn, checkOut, nama } = req.body;
        
        // Pengecekan body kosong (tetap pertahankan)
        if (checkIn === undefined && checkOut === undefined && nama === undefined) {
             return res.status(400).json({
                 message: "Request body tidak berisi data yang valid untuk diupdate (checkIn, checkOut, atau nama).",
             });
        }
        
        const recordToUpdate = await Presensi.findByPk(presensiId);
        
        // ===============================================
        // *** TAMBAHKAN PENGECEKAN INI ***
        if (!recordToUpdate) {
            return res.status(404).json({
                message: "Data presensi dengan ID " + presensiId + " tidak ditemukan."
            });
        }
        // ===============================================
        
        // Logika update data dan save
        recordToUpdate.checkIn = checkIn || recordToUpdate.checkIn;
        recordToUpdate.checkOut = checkOut || recordToUpdate.checkOut;
        recordToUpdate.nama = nama || recordToUpdate.nama;
        await recordToUpdate.save();

        res.json({
            message: "Data presensi berhasil diperbarui.",
            data: recordToUpdate,
        });

    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
    }
};
		
	


		
	  
			

