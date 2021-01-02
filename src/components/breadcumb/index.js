import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
// import { AppContext } from "layout/AppContext";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

const CustomLink = (props) => <NavLink {...props}>{props.children}</NavLink>;

const Bread = (props) => {
  // const { appContext } = useContext(AppContext);
  const [breadcrumbs, setBreadcrumb] = useState([]);

  function setBreadcrumbs(input) {
    switch (input.constructor) {
      case Array: {
        setBreadcrumb(input);
        break;
      }
      case Number:
      case String: {
        setBreadcrumb([
          {
            title: input,
          },
        ]);
        break;
      }
      default: {
        return;
      }
    }
  }

  useEffect(() => {
    const pathName = props?.history?.location?.pathname ?? "/";

    function caseWithRegex(regexString) {
      const regex = new RegExp(regexString);
      return (pathName.match(regex) || {}).input;
    }

    switch (pathName) {
      case "/sign-up":
        setBreadcrumbs("Sign Up Page");
        break;
      case "/users":
        setBreadcrumbs("User List Page");
        break;
      default:
        setBreadcrumbs("Page not found");
    }
  }, [props]);

  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item linkAs={CustomLink} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      {breadcrumbs.map((e, index) => {
        let attr = {};
        if (e.href) attr.href = e.href;
        if (index === breadcrumbs.length - 1) attr.active = true;
        return (
          <Breadcrumb.Item key={index} {...attr}>
            {e.title}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
export default withRouter(Bread);
