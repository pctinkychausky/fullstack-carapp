import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./LoginIcon.css";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div className="nav-container">
      <Nav className="d-none d-md-block" navbar>
        {!isAuthenticated && (
          <NavItem>
            <Button
              id="qsLoginBtn"
              color="primary"
              className="btn-margin"
              onClick={() => loginWithRedirect()}
            >
              Log in
            </Button>
          </NavItem>
        )}
        {isAuthenticated && (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret id="profileDropDown">
              <img
                src={user.picture}
                alt="Profile"
                className="nav-user-profile rounded-circle"
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{user.name}</DropdownItem>
              <DropdownItem
                tag={RouterNavLink}
                to="/profile"
                className="dropdown-profile"
                activeClassName="router-link-exact-active"
              >
                Profile
                {/* <FontAwesomeIcon icon="user" className="mr-3" /> Profile */}
              </DropdownItem>
              <DropdownItem
                tag={RouterNavLink}
                to="/admin"
                className="dropdown-profile"
                activeClassName="router-link-exact-active"
              >
                {/* <FontAwesomeIcon
                  icon="fa-solid fa-money-check-dollar-pen"
                  className="mr-3"
                /> */}
                Admin
              </DropdownItem>
              <DropdownItem
                tag={RouterNavLink}
                to="/basket"
                className="dropdown-profile"
                activeClassName="router-link-exact-active"
              >
                {/* <FontAwesomeIcon
                  icon="fa-solid fa-money-check-dollar-pen"
                  className="mr-3"
                /> */}
                Basket
              </DropdownItem>
              <DropdownItem
                id="qsLogoutBtn"
                onClick={() => logoutWithRedirect()}
              >
                Log out
                {/* <FontAwesomeIcon icon="power-off" className="mr-3" /> Log out */}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </Nav>
      {!isAuthenticated && (
        <Nav className="d-md-none" navbar>
          <NavItem>
            <Button
              id="qsLoginBtn"
              color="primary"
              block
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          </NavItem>
        </Nav>
      )}
      {isAuthenticated && (
        <Nav
          className="d-md-none justify-content-between"
          navbar
          style={{ minHeight: 170 }}
        >
          <NavItem>
            <span className="user-info">
              <img
                src={user.picture}
                alt="Profile"
                className="nav-user-profile d-inline-block rounded-circle mr-3"
                width="50"
              />
              <h6 className="d-inline-block">{user.name}</h6>
            </span>
          </NavItem>
          <NavItem>
            {/* <FontAwesomeIcon icon="user" className="mr-3" /> */}
            <RouterNavLink
              to="/profile"
              activeClassName="router-link-exact-active"
            >
              Profile
            </RouterNavLink>
          </NavItem>
          <NavItem>
            {/* <FontAwesomeIcon icon="power-off" className="mr-3" /> */}
            <RouterNavLink
              to="#"
              id="qsLogoutBtn"
              onClick={() => logoutWithRedirect()}
            >
              Log out
            </RouterNavLink>
          </NavItem>
        </Nav>
      )}
    </div>
  );
};

export default NavBar;
