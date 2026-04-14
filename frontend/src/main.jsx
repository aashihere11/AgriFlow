import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
   <Route path="/HomePage" element={<HomePage />} />
    <Route path="/" element={<LoginPage />} />
   </Routes>
  </BrowserRouter>,
)
