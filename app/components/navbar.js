"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Badge, Menu, MenuItem } from "@mui/material";
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
import NotificationsIcon from "@mui/icons-material/Notifications"; // Notification Icon
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from "next/navigation";
import axios from "axios";

const Menubar = ({ toggleDarkMode, darkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);
    const handleThemeToggle = () => toggleDarkMode();
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const userEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;

    // Fetch notifications every 10 seconds
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // if (!userEmail) return;
                // const res = await axios.get(`/api/notification/${userEmail}`);
                // setNotifications(res.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, [userEmail]);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Avatar 
                        alt="Fire Logo" 
                        src="https://s.tmimgcdn.com/scr/800x500/295800/fire-flame-vector-logo-hot-gas-and-energy-symbol-v57_295814-original.jpg" 
                        sx={{ marginRight: 2 }} 
                    />
                    <Typography variant="h6" sx={{ flexGrow: 5 }}>
                        FireBolt
                    </Typography>

                    {/* Notification Bell */}
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <Badge badgeContent={notifications.length} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* Notification Dropdown Menu */}
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        {notifications.length === 0 ? (
                            <MenuItem onClick={handleMenuClose}>No new notifications</MenuItem>
                        ) : (
                            notifications.map((notif, index) => (
                                <MenuItem key={index} onClick={handleMenuClose}>
                                    {notif.message}
                                </MenuItem>
                            ))
                        )}
                    </Menu>

                    {/* Theme Toggle */}
                    <IconButton color="inherit" onClick={handleThemeToggle}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <List sx={{ width: 250 }}>
                    <ListItem>
                        <Avatar 
                            alt="Fire Logo" 
                            src="https://s.tmimgcdn.com/scr/800x500/295800/fire-flame-vector-logo-hot-gas-and-energy-symbol-v57_295814-original.jpg" 
                            sx={{ marginRight: 1 }} 
                        />
                        <Typography variant="h6">FireBolt</Typography>
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/home")}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/settings")}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/settings")}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/form")}>
                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                        <ListItemText primary="Registration" />
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/wallet")}>
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText primary="My Wallet" />
                    </ListItem>
                    <ListItem button="true" onClick={() => router.push("/contact")}>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="Transaction" />
                    </ListItem>
                    <ListItem button="true" onClick={() => { localStorage.clear(); router.push("/login"); }}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider>
    );
};

export default Menubar;
