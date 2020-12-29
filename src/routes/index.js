/**
 * @author Thanh Ly
 * @description init source for commondb front end
 * @copyright 15/06/2020 Kyanon Digital
 */

import React from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import PageSignUp from "pages/SignUp";
import PageNotFound from "pages/NotFound";
// Contexts
import UserProvider from "contexts/User";

export default function RootRoute() {
  return (
    <UserProvider>
      <Switch>
        <Route path="/signup" exact component={PageSignUp} />
        <Route component={PageNotFound} />
      </Switch>
    </UserProvider>
  );
}
