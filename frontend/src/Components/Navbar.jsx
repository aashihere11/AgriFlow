import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './Drawer';
function Navbar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  return (<>

    {/* NAVBAR */}
    <nav className="bg-gradient-to-r from-[#e0f2fe] via-[#f0fdf4] to-[#fef3c7] flex items-center justify-between px-3 bg-white border-b border-gray-100 sticky top-0 z-10 h-30">
      <div className="flex items-center gap-4">
        <TemporaryDrawer />
        <Link to="/" className="flex-shrink-0">
          <img src="media/logo.png" alt="logo" className="w-80 h-auto object-contain" />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-5">
        {["Home", "Products", "Farmers", "About"].map(link => (
          <span key={link} className="text-lg font-medium text-gray-500 cursor-pointer hover:text-[#2e8a48] transition-colors">
            {link}
          </span>
        ))}
      </div>


      <button
        onClick={() => navigate('/cart')}
        className="flex items-center  px-2 py-2 !text-xs md:!text-base font-medium text-gray-400 rounded-lg hover:bg-black transition-colors text-nowrap">
        🛒 Cart (2)
      </button>

    </nav>
  </>
  );
}

export default Navbar;