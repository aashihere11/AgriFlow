import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';
export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const menuItems = [
        { label: 'Vegetables', icon: <i className="fa-solid fa-seedling"></i>, path: '/vegetables' },
        { label: 'Fruits', icon: <i className="fa-solid fa-apple-whole"></i>, path: '/fruits' },
        { label: 'Grains', icon: <i className="fa-solid fa-wheat-awn"></i>, path: '/grains' },
        { label: 'Herbs & Spices', icon: <i className="fa-solid fa-mortar-pestle"></i>, path: '/spices' },
        { label: 'dairy', icon: <i className="fa-solid fa-mortar-pestle"></i>, path: '/spices' },
        { label: 'Honey & Natural', icon: <i className="fa-solid fa-mortar-pestle"></i>, path: '/spices' }
    ];

   const navItems = [
  { path: "/farmer/dashboard",  label: "Dashboard" },
  { path: "/farmer/products", label: "My Products" },
  { path: "/farmer/orders", label: "Orders" },
  { path: "/farmer/earnings", label: "Earnings" },
  { path: "/farmer/profile", label: "Profile" },
  { path: "/farmer/settings", label: "Settings" },
  { path: "/farmer/login", label: "Logout" }
];

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    }
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} style={{ backgroundColor: "rgba(168, 218, 141, 0.84)" }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => handleNavigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => handleNavigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <img src="/media/veggie1.png" alt="" />
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon></MenuIcon></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
