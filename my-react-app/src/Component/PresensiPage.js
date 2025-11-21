// src/components/PresensiPage.js

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 

const getToken = () => localStorage.getItem("token"); 

function PresensiPage() { 
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 

  const handleCheckIn = async () => {
    setError("");
    setMessage("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`, 
        },
      };
      
      const response = await axios.post(
        "http://localhost:3001/api/presensi/check-in", 
        {}, 
        config
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Check-in gagal. Server mati.");
    }
  };
  
  const handleCheckOut = async () => {
    setError("");
    setMessage("");

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`, 
            },
        };

        const response = await axios.post(
            "http://localhost:3001/api/presensi/check-out", 
            {}, 
            config
        );
        setMessage(response.data.message);
    } catch (err) {
        setError(err.response ? err.response.data.message : "Check-out gagal. Server mati.");
    }
  }; 

  return ( 
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8"> 
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center border-t-8 border-gray-400"> 
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">
          Lakukan Presensi Harian
        </h2>
        
        {/* Pesan Umpan Balik */}
        {message && <p className="text-green-700 bg-green-100 font-medium p-4 rounded-lg mb-6 border border-green-300">{message}</p>} 
        {error && <p className="text-red-700 bg-red-100 font-medium p-4 rounded-lg mb-6 border border-red-300">{error}</p>} 
        
        {/* Tombol Aksi */}
        <div className="grid grid-cols-2 gap-4"> 
          <button
            onClick={handleCheckIn} 
            className="flex flex-col items-center justify-center py-6 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-150 transform hover:scale-105" 
          >
            <span className="text-4xl mb-2">⏱️</span>
            Check-In 
          </button>
          <button
            onClick={handleCheckOut} 
            className="flex flex-col items-center justify-center py-6 px-4 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-150 transform hover:scale-105" 
          >
            <span className="text-4xl mb-2">🚪</span>
            Check-Out 
          </button>
        </div>
      </div>
    </div>
    </>
  ); 
}

export default PresensiPage;