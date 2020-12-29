import React, { Component } from "react";
import { withRouter } from "react-router";
import RootRoute from "routes";
// import LoadingOverlay from "react-loading-overlay";
import { AppContext } from "layout/AppContext";
import { ToastContainer } from "react-toastr";
import { Container } from "react-bootstrap";
let toastr;
class Wrapper extends Component {
  state = {};
  /*
  How to use notify ==>
  1. Connect Context
  2. call appContext.notifySuccess("Notify","Example call") */
  notifySuccess = (title, content) => {
    toastr.success(content, title, {
      closeButton: true,
    });
  };
  notifyError = (title, content) => {
    toastr.error(content, title, {
      closeButton: true,
    });
  };

  render() {
    return (
      <AppContext.Provider value={{ appContext: this }}>
        <ToastContainer
          ref={(ref) => (toastr = ref)}
          className="toast-top-right"
        />
        <Container fluid className="pb-100">
          <RootRoute />
        </Container>
      </AppContext.Provider>
    );
  }
}
export default withRouter(Wrapper);
