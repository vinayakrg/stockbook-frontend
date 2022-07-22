import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts";

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success("Successfully logged out!");
  };
  return (
    <div className="container fixed-top py-3">
      <div className="d-flex justify-content-between">
        <Link to={"/"} className="nohover">
          <h6>StockBook</h6>
        </Link>

        <div>
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <a
                href="#"
                onClick={(e) => {
                  handleLogout(e);
                }}
                className="nohever pl-2"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nohover pl-2">
                Login
              </NavLink>
              <NavLink to="/register" className="nohover pl-2">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
