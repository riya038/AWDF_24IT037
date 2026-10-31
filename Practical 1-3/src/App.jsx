import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  const name = 'Riya Kalariya';
  
  const skillList = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Vite',
    'Node.js',
    'Git',
    'SQL',
    'UI/UX Design'
  ];

  const themeColor = '#06b6d4'; // Neon cyan accent passed as prop

  // Light/Dark mode state management (useState)
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to dark
    return localStorage.getItem('theme') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Add/remove class on the root element
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Home name={name} themeColor={themeColor} skillList={skillList} />} 
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
