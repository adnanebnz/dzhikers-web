import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import UsersViewer from "./UsersViewer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import ContactViewer from "./ContactViewer";
import ProductsViewer from "./ProductsViewer";
import OrdersViewer from "./OrdersViewer";
const drawerWidth = 260;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    backgroundColor: "#ffffff",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <List>
            <ListItem
              button
              onClick={() => {
                setHomeOpen(true);
                setContactsOpen(false);
                setUsersOpen(false);
                setProductsOpen(false);
                setOrdersOpen(false);
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Acceuil" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setProductsOpen(true);
                setOrdersOpen(false);
                setContactsOpen(false);
                setUsersOpen(false);
                setHomeOpen(false);
              }}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Produits" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setOrdersOpen(true);
                setProductsOpen(false);
                setContactsOpen(false);
                setUsersOpen(false);
                setHomeOpen(false);
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Commandes" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                setContactsOpen(false);
                setProductsOpen(false);
                setOrdersOpen(false);
                setUsersOpen(true);
                setHomeOpen(false);
              }}
            >
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setContactsOpen(true);
                setProductsOpen(false);
                setOrdersOpen(false);
                setUsersOpen(false);
                setHomeOpen(false);
              }}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Messages de contact" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "90vh",
            display: "flex",

            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              paddintTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {homeOpen && <h1>TEST</h1>}
            {usersOpen && <UsersViewer />}
            {productsOpen && <ProductsViewer />}
            {ordersOpen && <OrdersViewer />}
            {contactsOpen && <ContactViewer />}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
