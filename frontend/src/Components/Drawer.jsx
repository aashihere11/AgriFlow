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
import { useAuth } from '../context/AuthContext';
export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const { user } = useAuth();
     const userRole = user?.role;
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const navItems = [
        { path: "/dashboard", label: "Dashboard", roles: ["farmer", "consumer"] },
        { path: "/myproducts", label: "My Products" , roles: ["farmer"] },
        { path: "/orders", label: "Orders", roles: ["consumer"] },
        { path: "/farmer/earnings", label: "Earnings" , roles: ["farmer"] },
        { path: "/profile", label: "Profile" , roles: ["farmer"] },
         {path:"farmerorder", label:"orders",roles: ["farmer"] },
        { path: "/farmer/settings", label: "Settings" , roles: ["farmer", "consumer"]  },
        { path: "/", label: "Logout", roles: ["farmer", "consumer"] }
    ];

    const filterdNavItems = navItems.filter((item) => item.roles.includes(userRole))
    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    }
    const DrawerList = (
        <Box className="min-h-screen bg-[#a8da8dd6] font-medium" sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} >
            <List>
                {filterdNavItems.map((item) => (
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
