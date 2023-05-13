import React from 'react';
import logo from './assets/logo.png';
import './App.css';
import Phone from './compoents/Phone';

function App() {
  return (
    <main>
      <img src={logo}
        alt="Logo"
        width="106"
        height="36"
      />

      <Phone />

      <a className="download-btn" href="https://article.zlink.toutiao.com/d13Q">下载今日头条</a>
    </main>
  );
}

export default App;
