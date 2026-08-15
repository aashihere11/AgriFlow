import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './Drawer';
function Navbar() {
    const [open, setOpen] = React.useState(false);
      const navigate = useNavigate();
    return (<>

    {/* NAVBAR */}
      <nav className="flex items-center justify-between px-3 bg-white border-b border-gray-100 sticky top-0 z-10 h-30">
        <TemporaryDrawer/>
        <Link to="/" ><img src="media/logo.png" alt="logo"  className=" w-80 shrink-0" /></Link>
        <div className="hidden md:flex items-center gap-5">
          {["Home", "Products", "Farmers", "About"].map(link => (
            <span key={link} className="text-lg font-medium text-gray-500 cursor-pointer hover:text-[#2e8a48] transition-colors">
              {link}
            </span>
          ))}
        </div>
        <div className="hidden md:flex gap-5">
                  <img src="media/bowl.png" alt="bowl" style={{ width: "80px" }} />
                        <img src="media/wheat.png" alt="bowl" style={{ width: "80px" }} />
                         </div>              
          
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center  px-2 py-2 !text-xs md:!text-base font-medium text-gray-200 rounded-lg hover:bg-black transition-colors text-nowrap">
            🛒 Cart (2)
          </button>
        
      </nav>
    </>
    );
}

export default Navbar;