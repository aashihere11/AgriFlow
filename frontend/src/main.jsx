import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import VegetablePage from './Pages/Vegetables.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import CartPage from './Pages/CartPage.jsx';
import DashboardPage from './Pages/DashboardPage.jsx';
import CheckoutPage from './Pages/CheckoutPage.jsx';
import ConfirmationPage from './Pages/ConfirmationPage.jsx';
import MyProductsPage from './Pages/MyProductsPage.jsx';
import FarmerOrderPage from './Pages/FarmerOrderPage.jsx';
import CustomerOrderPage from './Pages/CustomerOrderPage.jsx';
import EarningPage from './Pages/EarningPage.jsx';
import FarmerProfilePage from './Pages/FarmerProfilePage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import UnauthorizedPage from './Pages/UnauthorizedPage.jsx';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <Routes >
    <Route path="/login" element={<LoginPage />} />
     <Route path="/signup" element={<SignupPage/>} />
     <Route path="/unauthorized" element={<UnauthorizedPage/>} />


    <Route element={<ProtectedRoute allowedRoles={['farmer']}/>}>
    <Route path="/Product" element={<ProductPage/>} />
      <Route path="/dashboard" element={<DashboardPage/>} />
      <Route path="/earnings" element={<EarningPage/>} />
        <Route path="/profile" element={<FarmerProfilePage/>} />
         <Route path="/myproducts" element={<MyProductsPage/>} />
      <Route path="/farmerorder" element={<FarmerOrderPage/>} />
      </Route>


      <Route element={<ProtectedRoute allowedRoles={['consumer']}/>}>
      <Route path="/Checkoutpage" element={<CheckoutPage/>} />
      <Route path="/confirmationpage" element={<ConfirmationPage/>} />
       <Route path="/myorders" element={<CustomerOrderPage/>} />
       <Route path="/cart" element={<CartPage/>} />  
     </Route>

     <Route element={<ProtectedRoute allowedRoles={['consumer', 'farmer']}/>}>
      <Route path="/" element={<HomePage />} />
     </Route>
   </Routes>
   </AuthProvider>
  </BrowserRouter>,
)
