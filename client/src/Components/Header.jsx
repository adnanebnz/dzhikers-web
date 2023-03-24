import React, { useState } from "react";
import styled from "styled-components";
import logoo from "../assets/logoo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, IconButton, Typography, Box } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { setIsCartOpen } from "../state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const Header = () => {
  const [navbarState, setNavbarState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDashboard = () => {
    navigate(`/profile/dashboard/${currentUser.details._id}`);

    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate(`/profile/${currentUser.details._id}`);
    setAnchorEl(null);
  };
  const handleDisconnect = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8800/api/users/logout", "", {
      withCredentials: true,
    });
    localStorage.setItem("currentUser", null);
    navigate("/");
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <Nav>
        <div className="brand">
          <div className="container" onClick={() => navigate("/")}>
            <img src={logoo} alt="" style={{ height: "50px" }} />
            DZHIKERS
          </div>
        </div>

        <ul>
          <li>
            <Link to="/">Acceuil</Link>
          </li>
          <li>
            <Link to="/randos">Randonnées</Link>
          </li>
          <li>
            <Link to="/boutique">Boutique</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          {!currentUser?.isAdmin && (
            <Badge
              className="badge"
              badgeContent={cart.length}
              color="error"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "18px",
                  minWidth: "18px",
                },
              }}
            >
              <IconButton
                className="cart"
                onClick={() => dispatch(setIsCartOpen({}))}
                sx={{ color: "black", height: "40px" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
          )}
          {currentUser && (
            <div className="userInfos">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleBtn}
                >
                  <Avatar
                    alt=""
                    src={currentUser.details.img || `../assets/noavatar.png`}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
                <Typography
                  className="username"
                  variant="h6"
                  fontWeight="600"
                  fontSize="16px"
                  sx={{ color: "black" }}
                >
                  {currentUser.details.username}
                </Typography>
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                {!currentUser.isAdmin && (
                  <MenuItem onClick={handleDashboard}>
                    Mes achats et réservations
                  </MenuItem>
                )}
                {currentUser.isAdmin && (
                  <MenuItem onClick={() => navigate(`/admin`)}>
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleDisconnect}>Se deconnecter</MenuItem>
              </Menu>
            </div>
          )}
          {!currentUser && (
            <>
              <button className="button" onClick={() => navigate("/login")}>
                Se connecter
              </button>
              <button className="button" onClick={() => navigate("/register")}>
                Créer un compte
              </button>
            </>
          )}
        </div>
        <div className="toggle">
          {navbarState ? (
            <VscChromeClose onClick={() => setNavbarState(false)} />
          ) : (
            <GiHamburgerMenu onClick={() => setNavbarState(true)} />
          )}
        </div>
      </Nav>
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <Link to="/" onClick={() => setNavbarState(false)}>
              Acceuil
            </Link>
          </li>
          <li>
            <Link to="/randos" onClick={() => setNavbarState(false)}>
              Randonnées
            </Link>
          </li>
          <li>
            <Link to="/boutique" onClick={() => setNavbarState(false)}>
              Boutique
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setNavbarState(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/checkout" onClick={() => setNavbarState(false)}>
              Panier
            </Link>
          </li>
          {!currentUser && (
            <>
              <li>
                <Link to="/login" onClick={() => setNavbarState(false)}>
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setNavbarState(false)}>
                  Créer un Compte
                </Link>
              </li>
            </>
          )}
        </ul>
      </ResponsiveNav>
    </div>
  );
};

const Nav = styled.nav`
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
  }
  .toggle {
    display: none;
  }

  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
  .button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #1e90ff;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #0077b6;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .toggle {
      display: block;
      font-size: 20px;
      align-self: center;
      padding-left: 10px;
    }
    .username {
      display: none;
    }
    ul {
      display: none;
    }
    .button {
      display: none;
    }
    .badge {
      display: none;
    }
    .cart {
      display: none;
    }
    .userInfos {
      display: flex;
    }
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "90px" : "-400px")};
  background-color: white;
  height: auto;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
    .account {
      text-decoration: none;
      color: #0077b6;
      font-size: 1.2rem;
      transition: 0.1s ease-in-out;
      &:hover {
        color: #023e8a;
      }
    }
  }
`;
export default Header;
