import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <h1>Selamat datang Di Aplikasi React</h1>
      <p>Ini adalah komponen React Sederhana.</p>
    </div>
  );
}

 	import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Integrasi React dan Node.js</h1>
      <p>Pesan dari server: {message}</p>
    </div>
  );
}


export default App;
