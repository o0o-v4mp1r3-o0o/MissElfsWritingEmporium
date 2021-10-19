import React from "react";
import "./UserHomePage.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  Button,
} from "reactstrap";
import "./NavigationBar.css";
import { Alert } from "@mui/material";

function NavigationBar() {
  const auth = getAuth();
  const navigatehome = useHistory();
  const [dropdownOpen, setOpen] = useState();
  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div className="toolbar">
      <Navbar color="light" className="navbar">
        <div className="homeandstories">
          <div onClick={() => navigatehome.push("/Home")}>
            <Button color="dark" className="home">
              Home
            </Button>
          </div>
          <div onClick={() => navigatehome.push({ pathname: "/Stories" })}>
            <Button color="dark" className="yourstories">
              Your Stories
            </Button>
          </div>
        </div>
        <div className="shotinthedark">
          <div
            className="about"
            onClick={() => navigatehome.push({ pathname: "/About" })}
          >
            <Button color="dark">About</Button>
          </div>
          <div
            className="donate"
            onClick={() => navigatehome.push({ pathname: "/Donate" })}
          >
            <Button color="dark">Donate</Button>
          </div>
        </div>

        <ButtonDropdown
          className="displayname"
          isOpen={dropdownOpen}
          toggle={toggle}
          direction="left"
        >
          <DropdownToggle>
            {auth.currentUser.displayName
              ? auth.currentUser.displayName
              : auth.currentUser.email}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() =>
                navigatehome.push({
                  pathname: "/Stories",
                })
              }
            >
              My Stories
            </DropdownItem>
            <DropdownItem onClick={() => alert("Under Construction")}>
              Settings
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={auth.signOut} href="/">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
