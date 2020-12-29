//Import css files

import "styles/style.scss";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Wrapper from "layout/Wrapper";
export default function App() {
  return (
    <Router>
      <Wrapper />
    </Router>
  );
}
