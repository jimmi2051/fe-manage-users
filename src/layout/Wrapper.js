import React, { Component } from "react";
import { withRouter } from "react-router";
import RootRoute from "routes";
// import LoadingOverlay from "react-loading-overlay";
import { AppContext } from "layout/AppContext";
import { ToastContainer } from "react-toastr";
import { Container } from "react-bootstrap";
import Header from "components/header";
import Footer from "components/footer";
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
        <Header />
        <Container fluid className="height-max">
          <RootRoute />
        </Container>
        <Footer />
      </AppContext.Provider>
    );
  }
}
export default withRouter(Wrapper);
