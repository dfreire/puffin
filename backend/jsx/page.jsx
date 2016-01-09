import React from "react";
import Navbar from "./navbar.jsx";

export default React.createClass({
    render() {
        console.log("Page props", this.props);
        return (
            <div>
                <Navbar activeLanguage={this.props.route.activeLanguage} languages={this.props.route.languages} menuItems={this.props.route.menuItems} />
                <h1>Hello</h1>
            </div>
        );
    }
});
