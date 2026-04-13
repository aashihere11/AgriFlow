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
export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const icons = [
        <a><i class="fa-solid fa-seedling"></i></a>,
        <a ><i class="fa-solid fa-apple-whole"></i></a>,
        <a><i class="fa-solid fa-wheat-awn"></i></a>,
        <a><i class="fa-solid fa-mortar-pestle"></i></a>
    ];

     const icons1 = [
        <a><i class="fa-solid fa-gear"></i></a>,
        <a ><i class="fa-solid fa-file-shield"></i></a>,
        <a><i class="fa-solid fa-arrow-right-from-bracket"></i></a>,
        
    ];
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} style={{backgroundColor:"rgba(168, 218, 141, 0.84)"}}>
            <List>
                {['Vegetables', 'Fruits', 'Grains', 'Spices'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                               {icons[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Settings', 'Privacy', 'Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {icons1[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
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
