import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CartMenu from "./Components/CartMenu";
import Home from "./pages/home/Home";
import Single from "./pages/randos/Single";
import Randos from "./pages/randos/Randos";
import Shop from "./pages/shop/Shop";
import Product from "./pages/shop/Product";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/userDashboard/Profile";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import Contact from "./pages/Contact";
import Checkout from "./pages/checkout/Checkout";
import Register from "./pages/auth/Register";
import SendEmail from "./pages/auth/SendEmail";
import Login from "./pages/auth/Login";
import ProcessCheckout from "./pages/checkout/ProcessCheckout";
import Success from "./pages/checkout/Success";
import Cancel from "./pages/checkout/Cancel";
import Error from "./pages/Error";
import EditProfile from "./pages/userDashboard/EditProfile";
import Organizer from "./pages/organizer/Organizer";
import OrganizerView from "./pages/organizer/OrganizerView";
import ResetPassword from "./pages/auth/ResetPassword";
import SingleRandoViewer from "./pages/organizer/SingleRandoViewer";
import NotificationsViewer from "./pages/userDashboard/NotificationsViewer";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <CartMenu />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/randos/:id",
        element: <Single />,
      },
      {
        path: "/randos",
        element: <Randos />,
      },
      {
        path: "/boutique",
        element: <Shop />,
      },
      {
        path: "/boutique/:id",
        element: <Product />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/ajouter-produit",
        element: <AddProduct />,
      },
      {
        path: "/admin/modifier-produit/:id",
        element: <EditProduct />,
      },
      {
        path: "/organizer",
        element: <Organizer />,
      },
      {
        path: "/organizer/overview",
        element: <OrganizerView />,
      },
      {
        path: "/organizer/overview/:id",
        element: <SingleRandoViewer />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/profile/modifier/:id",
        element: <EditProfile />,
      },
      {
        path: "/profile/dashboard/:id",
        element: <UserDashboard />,
      },
      {
        path: "/profile/notifs",
        element: <NotificationsViewer />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/reset-password",
    element: <SendEmail />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/checkout/process",
    element: <ProcessCheckout />,
  },
  {
    path: "/checkout/success",
    element: <Success />,
  },
  {
    path: "/checkout/cancel",
    element: <Cancel />,
  },
]);

function App() {
  return (
    <div style={{ width: "100%" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
