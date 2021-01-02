import React from "react";
import { Navbar } from "react-bootstrap";
// import { AppContext } from "layout/AppContext";
const Footer = (props) => {
  // const { appContext } = useContext(AppContext);

  return (
    <Navbar bg="light" expand="lg" className="footer">
      <label className="copy-right">© 2021 Thanh Ly.</label>
    </Navbar>
  );
};
export default Footer;
