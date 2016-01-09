import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect} from "react-router";
import Navbar from "./navbar.jsx";

const Root = React.createClass({
    getInitialState() {
        return { languages: [], menuItems: [] };
    },
    componentDidMount() {
        $.getJSON("/main.json", (data) => {
            this.setState({languages: data.languages, menuItems: data.menuItems});
        });
    },
    render() {
        return (
            <Navbar activeLanguage={this.props.route.activeLanguage}
                languages={this.state.languages}
                menuItems={this.state.menuItems} />
        );
    }
});

ReactDOM.render((
    <Router>
        <Route>
            <Route path="en" component={Root} activeLanguage="en" />
            <Route path="pt" component={Root} activeLanguage="pt" />
            <Redirect from="/" to="/en" />
        </Route>
    </Router>
), document.getElementById("root"))
