import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";

import "./styles.css";
import { MyContext } from "../AppContext/contextProvider";
import { Link, useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const {user, setUser} = useContext(MyContext)
    const goTo = useNavigate()
    const token = localStorage.getItem("token")
    const handleSignOut = () => {
      localStorage.removeItem("token");
      setUser(undefined)
      goTo("/login")
    }
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="toolbar">
          <Link className="hello-topbar" to={user ? `/users/${user._id}` : `/login`}>
            {user ? `Hi ${user?.first_name } ${user?.last_name }` : "Tran Van Huy_B21DCCN442"}
          </Link>
          {token && 
          <div id="log-out">
            <button  className="sign-out" onClick={handleSignOut}>Log out</button>
          </div>}
        </Toolbar>
      </AppBar>
      
    );
}

export default TopBar;
