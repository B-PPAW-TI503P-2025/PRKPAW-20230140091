import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import jwtDecode setelah instalasi
import { jwtDecode } from 'jwt-decode'; 

function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Pengguna'); // State untuk menyimpan nama pengguna

  useEffect(() => {
    // 1. Ambil token dari local storage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // 2. Decode token untuk mendapatkan data pengguna (termasuk nama)
        const decoded = jwtDecode(token);
        // Asumsi payload JWT memiliki field 'name'
        setUserName(decoded.name || decoded.email || 'Pengguna'); 
      } catch (error) {
        console.error("Token tidak valid:", error);
        // Jika token tidak valid, hapus dan arahkan ke login
        handleLogout();
      }
    } else {
      // Jika tidak ada token, arahkan ke login
      navigate('/login');
    }
  }, [navigate]);

  // 3. Implementasi Fungsi Logout (sesuai tugas)
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem('token'); 
    // Mengarahkan pengguna kembali ke halaman /login
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl text-center border-t-4 border-indigo-500">
        <svg className="w-16 h-16 text-indigo-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c-3.197 0-6.195 1.157-8.452 3.032m16.894 0A11.955 11.955 0 0112 21.056c-3.197 0-6.195-1.157-8.452-3.032m0 0a11.95 11.95 0 010-14.168m0 14.168a11.95 11.95 0 0116.894 0m-16.894 0a11.95 11.95 0 010-14.168m0 14.168a11.95 11.95 0 0116.894 0"></path>
        </svg>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Selamat Datang, {userName}!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Anda telah berhasil masuk ke Dashboard.
        </p>
        
        <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <p className="text-gray-700 text-sm">
                Ini adalah halaman khusus yang hanya dapat diakses setelah autentikasi.
            </p>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 py-3 px-8 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;