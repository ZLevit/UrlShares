import "../styles/sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if a user is already logged in
    auth.onAuthStateChanged((user) => {
     if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  
  const handleLogout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
    }).catch((error) => {
      console.error('Error occurred while logging out:', error);
    });
  };
  let hideSideBar = true;
  return (
    hideSideBar ? null :
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">UrlShare</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
         
          <p className="title">USER</p>         
          {loggedIn && (
            <ul>
              <li onClick={handleLogout}>
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </li>
            </ul>
          )}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
