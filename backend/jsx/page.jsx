import React from "react";
import Navbar from "./navbar.jsx";

export default React.createClass({
    render() {
        console.log(this.props.route);
        return (
            <div>
                <Navbar activePath={this.props.route.path}
                    activeLanguage={this.props.route.activeLanguage}
                    languages={this.props.route.languages}
                    menuItems={this.props.route.menuItems}
                />
                <div className="container">
                    <h1>{this.props.route.title}</h1>
                </div>
            </div>
        );
    }
});
