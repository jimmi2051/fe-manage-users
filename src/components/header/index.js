import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { AppContext } from "layout/AppContext";
import { ImageList } from "utils/Constants";
import Breadcrumb from "components/breadcumb";

const CustomLink = (props) => <NavLink {...props}>{props.children}</NavLink>;

const Header = () => {
  // const { appContext } = useContext(AppContext);
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" className="nav-custom">
        <Navbar.Brand as={CustomLink} to="/users" href="/users">
          <img
            src={ImageList.logo}
            className="d-inline-block align-top logo"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="ml-sm-3 mr-auto">
          <Nav.Link as={CustomLink} to="/users" href="/users">
            User List
          </Nav.Link>
        </Nav>

        <Nav className="ml-sm-2 mr-sm-2">
          <Nav.Link as={CustomLink} to="/sign-up" href="/sign-up">
            Sign Up
          </Nav.Link>
        </Nav>
      </Navbar>
      <Breadcrumb />
    </div>
  );
};
export default Header;
