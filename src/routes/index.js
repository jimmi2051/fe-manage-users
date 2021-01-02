/**
 * @author Thanh Ly
 * @description init source for commondb front end
 * @copyright 15/06/2020 Kyanon Digital
 */

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Pages
import PageSignUp from "pages/SignUp";
import PageUserList from "pages/UserList";
import PageNotFound from "pages/NotFound";

// Contexts
import UserProvider from "contexts/User";

export default function RootRoute() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/users" />} />
        <Route path="/sign-up" exact component={PageSignUp} />
        <Route path="/users" exact component={PageUserList} />
        <Route component={PageNotFound} />
      </Switch>
    </UserProvider>
  );
}
