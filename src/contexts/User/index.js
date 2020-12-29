import React, { Component, createContext, PureComponent } from "react";
import FetchApi from "utils/FetchApi";
import queryString from "query-string";

export const UserContext = createContext();

class UserContextProvider extends PureComponent {
  state = {
    data: [],
  };

  //#region Fetch API

  //#endregion

  render() {
    return (
      <UserContext.Provider value={{ user: this }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
