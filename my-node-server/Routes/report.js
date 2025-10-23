const presensiRecords = require("../data/presensiData");
exports.getDailyReport = (req, res) => {
  console.log("Controller: Mengambil data laporan harian dari array...");
  res.json({
    reportDate: new Date().toLocaleDateString(),
    data: presensiRecords,
  });
};

const express = require('express');
const router = express.Router();
 	const reportController = require('../controllers/reportcontroller');
 	const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');
 	router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);
 	module.exports = router;



