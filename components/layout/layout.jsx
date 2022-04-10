// Material
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalculateIcon from "@mui/icons-material/Calculate";
import HistoryIcon from "@mui/icons-material/History";

// React
// import { useState } from "react";

const appbarHeight = 64;

const pages = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Accounts", icon: <AccountBalanceWalletIcon /> },
    { label: "Budgets", icon: <CalculateIcon /> },
    { label: "History", icon: <HistoryIcon /> },
];

const layout = ({ children, user }) => {
    return (
        <Box>
            <AppBar position="static" elevation={1}>
                <Toolbar sx={{ height: appbarHeight }} disableGutters>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ m: 1 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Money Go Where
                    </Typography>
                    <Button variant="outlined" color="inherit" sx={{ textTransform: "none", m: 1.5 }}>
                        Add Task
                    </Button>
                </Toolbar>
            </AppBar>
            <ChildrenContainer>{children}</ChildrenContainer>
        </Box>
    );
};

export default layout;

const ChildrenContainer = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "calc(100vh - 64px)",
    padding: 16,
}));
