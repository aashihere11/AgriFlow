import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './Drawer';
function Navbar() {
    const [open, setOpen] = React.useState(false);
    return (<>

        <nav className="navbar mb-2 " style={{ backgroundColor: "rgba(168, 218, 141, 0.84)" }}>
            <TemporaryDrawer open={open} onClose={() => setOpen(false)} />
            <div class="container-fluid">
                <Link to="/">
                    <img className="logo" src="media/logo.png" alt="logo" />
                </Link>
                <img src="media/bowl.png" alt="bowl" style={{ width: "5%" }} />
                <img src="media/plant.png" alt="bowl" style={{ width: "5%" }} />
                <img src="media/wheat.png" alt="bowl" style={{ width: "5%" }} />
                <img src="media/sack.png" alt="bowl" style={{ width: "5%" }} />
                <form className="d-flex search" role="search ">
                    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>

                <div className='rounded-circle border mt-1 profile' style={{ height: "30px", width: "30px" }}></div>
            </div>
        </nav>
    </>
    );
}

export default Navbar;