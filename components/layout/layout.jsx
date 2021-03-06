// Next
import Link from "next/link";
import { useRouter } from "next/router";

// React
import { useState } from "react";

// Material
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Icons
import AddCardIcon from "@mui/icons-material/AddCard";
import AppsIcon from "@mui/icons-material/Apps";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import Icon from "../../public/icon.svg";

//Firestore
import { doc } from "firebase/firestore";
import { firestore } from "../../utils/firebase";

// Components
import ModalC from "./modal";

const pages = [
    { label: "Dashboard", icon: <AppsIcon /> },
    { label: "Accounts", icon: <AddCardIcon /> },
    { label: "Budgets", icon: <PriceCheckIcon /> },
    { label: "History", icon: <HistoryIcon /> },
];

const Layout = ({ children, user, fields }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const toggleModal = (open) => () => {
        setModalOpen(open);
    };

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0} enableColorOnDark>
                <Toolbar sx={{ height: 64 }} disableGutters>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ m: 1 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Money go Where
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={toggleModal(true)} sx={{ textTransform: "none", m: 1.5 }}>
                        Add Expense
                    </Button>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} disableSwipeToOpen>
                <Box sx={{ width: 300, height: "100%" }}>
                    <List>
                        <ListItem sx={{ mb: 1, height: 64, pl: 3 }}>
                            <ListItemIcon sx={{ minWidth: 40, minHeight: 40 }}>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography fontSize={20} fontWeight={700}>
                                        Money go Where
                                    </Typography>
                                }
                                sx={{ px: 3 }}
                            />
                        </ListItem>
                        <Divider variant="middle" />
                        {pages.map(({ label, icon }, index) => {
                            const match = `/${label.toLowerCase()}` == router.pathname;
                            return (
                                <ListItem key={index}>
                                    <Link href={`/${label.toLowerCase()}`} passHref>
                                        <ListItemButton sx={{ borderRadius: 2 }} selected={match}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={label} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                    <List sx={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
                        <ListItem>
                            <Link href="/profile" passHref>
                                <ListItemButton sx={{ borderRadius: 2 }} selected={router.pathname == "/profile"}>
                                    <ListItemIcon>
                                        {user.photoURL ? (
                                            <Avatar alt={user.displayName} src={user.photoURL} referrerPolicy="origin" />
                                        ) : (
                                            <Avatar alt={user.displayName}>
                                                <PersonIcon />
                                            </Avatar>
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={user.displayName} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
            <ChildrenContainer>{children}</ChildrenContainer>
            {router.pathname == "/dashboard" ? (
                <ModalC state={modalOpen} setState={setModalOpen} fields={fields} doc={doc(firestore, "users", user.uid)} />
            ) : router.pathname == "/accounts" ? (
                <ModalC state={modalOpen} setState={setModalOpen} fields={fields} doc={doc(firestore, "users", user.uid)} />
            ) : null}
        </>
    );
};

export default Layout;

const ChildrenContainer = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "calc(100vh - 64px)",
    padding: 16,
}));
