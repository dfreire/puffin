import React from "react";
import Navbar from "./navbar.jsx";

export default React.createClass({
    render() {
        console.log("Page", this.props.route);
        return (
            <div>
                <Navbar route={this.props.route} />
                <h1>{this.props.route.activePage.title[this.props.route.activeLanguage]}</h1>
            </div>
        );
    }
});
