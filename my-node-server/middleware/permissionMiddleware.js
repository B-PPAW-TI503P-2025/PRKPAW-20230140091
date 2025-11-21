// middleware/permissionMiddleware.js

const jwt = require("jsonwebtoken"); // [cite: 22]
// PERBAIKAN: Tambahkan nilai fallback untuk memastikan JWT_SECRET tidak undefined
// Nilai fallback harus sama persis dengan yang ada di .env dan authController.js
const JWT_SECRET = process.env.JWT_SECRET || 'INI_ADALAH_KUNCI_RAHASIA_ANDA_YANG_SANGAT_AMAN'; 

exports.authenticateToken = (req, res, next) => { // [cite: 24]
  const authHeader = req.headers["authorization"]; // [cite: 25]
  const token = authHeader && authHeader.split(" ")[1]; // [cite: 26]

  if (token == null) { // [cite: 27]
    return res.status(401).json({ message: "Akses ditolak. Token tidak disediakan." }); // [cite: 28, 29, 30]
  }

  jwt.verify(token, JWT_SECRET, (err, userPayload) => { // [cite: 32]
    if (err) { // [cite: 33]
      return res.status(403).json({ message: "Token tidak valid atau kedaluwarsa." }); // [cite: 34, 35, 36]
    }

    req.user = userPayload; // Menyimpan payload user ke request 
    next(); // [cite: 39]
  });
}; // [cite: 41]

// Middleware 'isAdmin' akan memeriksa 'role' dari token yang sudah disimpan di req.user [cite: 42]
exports.isAdmin = (req, res, next) => { // [cite: 43]
  if (req.user && req.user.role === "admin") { // [cite: 44]
    next(); // [cite: 45]
  } else { // [cite: 46]
    return res.status(403).json({ message: "Akses ditolak. Hanya untuk admin." }); // [cite: 47, 48, 49]
  }
}; // [cite: 51]