import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
   <Route path="/" element={<HomePage />} />
   </Routes>
  </BrowserRouter>,
)
