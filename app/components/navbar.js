"use client";
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Menubar = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}> {/* Set the background color */}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Avatar alt="Fire Logo" src="../../fireboltlogo.avif" sx={{ marginRight: 2 }} /> {/* Add the image */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FireBolt
                    </Typography>
                    <IconButton color="inherit" onClick={handleThemeToggle}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <List sx={{ width: 250 }}> {/* Set the width of the List */}
                    <ListItem>
                        <Avatar alt="Fire Logo" src="./fireboltlogo.avif" sx={{ marginRight: 2 }} /> {/* Add the image */}
                        <Typography variant="h6">
                            FireBolt
                        </Typography>
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Registration" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Wallet" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transaction" />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={handleDrawerClose}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change the background color on hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    );
};

export default Menubar;