import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./navbar.jsx";

const Root = React.createClass({
    render() {
        return (
            <Navbar lang="en" />
        );
    }
});

ReactDOM.render(
  <Root />,
  document.getElementById("root")
);
