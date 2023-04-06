import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import UsersViewer from "./UsersViewer";
import axios from "axios";
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
import { useState, useEffect } from "react";
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
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [contactsCount, setContactsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  useEffect(() => {
    const getProductsCount = async () => {
      const { data } = await axios.get(
        "http://localhost:8800/api/items?category=all&page=1&min=0&max=1000000000",
        {
          withCredentials: true,
        }
      );
      setProductsCount(data.count);
    };
    const getOrdersCount = async () => {
      const { data } = await axios.get("http://localhost:8800/api/orders", {
        withCredentials: true,
      });
      setOrdersCount(data.length);
      setTotalIncomes(
        data.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)
      );
    };
    const getContactsCount = async () => {
      const { data } = await axios.get("http://localhost:8800/api/messages", {
        withCredentials: true,
      });
      setContactsCount(data.length);
    };
    const getUsersCount = async () => {
      const { data } = await axios.get("http://localhost:8800/api/users");
      setUsersCount(data.length);
      setOrgCount(
        data.reduce((acc, curr) => {
          return acc + curr.isOrg;
        }, 0)
      );
    };

    getProductsCount();
    getOrdersCount();
    getContactsCount();
    getUsersCount();
  }, []);

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
            {homeOpen && (
              <>
                <div className="flex justify-center  py-10 p-14  mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 ">
                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-blue-500 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">Produits</p>
                      </div>
                      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{productsCount}</p>
                      <hr />
                    </div>

                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-green-400 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">
                          Commandes
                        </p>
                      </div>
                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{ordersCount}</p>
                      <hr />
                    </div>
                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-emerald-400 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">
                          Revenus (DZD)
                        </p>
                      </div>
                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{totalIncomes} DZD</p>
                      <hr />
                    </div>
                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-red-400 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">
                          Utulisateurs
                        </p>
                      </div>
                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{usersCount}</p>
                      <hr />
                    </div>
                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-yellow-400 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">
                          Organisateurs
                        </p>
                      </div>
                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{orgCount}</p>
                      <hr />
                    </div>
                    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
                      <div className="h-20 bg-orange-400 flex items-center justify-between">
                        <p className="mr-0 text-white text-lg pl-5">
                          Messages de contact
                        </p>
                      </div>
                      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                        <p>TOTAL</p>
                      </div>
                      <p className="py-4 text-3xl ml-5">{contactsCount}</p>
                      <hr />
                    </div>
                  </div>
                </div>
              </>
            )}
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
