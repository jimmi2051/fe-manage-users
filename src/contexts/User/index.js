import React, { createContext, PureComponent } from "react";
import FetchApi from "utils/FetchApi";
import queryString from "query-string";

export const UserContext = createContext();

class UserContextProvider extends PureComponent {
  //#region Fetch API
  fetchGetUsers = (params = {}) => {
    if (!params.page) {
      params["page"] = 1;
    }
    if (!params.pageSize) {
      params["pageSize"] = 10;
    }
    const payload = {
      uri: `users?${queryString.stringify(params)}`,
    };
    return FetchApi(payload);
  };

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
