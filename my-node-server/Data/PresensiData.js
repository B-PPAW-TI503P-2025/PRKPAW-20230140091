// Simple in-memory storage for presensi (attendance) records
// Each record shape:
// { userId: number, nama: string, checkIn: Date, checkOut: Date | null }

const presensiRecords = [];

module.exports = presensiRecords;
