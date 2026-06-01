import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import VegetablePage from './Pages/Vegetables.jsx';
import ProductPage from './Pages/ProductPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
   <Route path="/HomePage" element={<HomePage />} />
    <Route path="/" element={<LoginPage />} />
    <Route path="/Vegetables" element={<VegetablePage />}/>
    <Route path="/Product" element={<ProductPage/>} />
   </Routes>
  </BrowserRouter>,
)
