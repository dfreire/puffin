import React from "react";
import Navbar from "./navbar.jsx";

export default React.createClass({
    render() {
        return (
            <div>
                <Navbar route={this.props.route} />
                <div className="container">
                    <h1>{this.props.route.activePage.title[this.props.route.activeLanguage]}</h1>
                </div>
            </div>
        );
    }
});
