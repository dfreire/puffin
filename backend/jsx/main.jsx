import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect} from "react-router";
import slug from "slug";
import Navbar from "./navbar.jsx";

const Root = React.createClass({
    render() {
        console.log(this.props);
        return (
            <Navbar activeLanguage={this.props.route.activeLanguage}
                languages={this.props.route.languages}
                menuItems={this.props.route.menuItems} />
        );
    }
});

const Main = React.createClass({
    getInitialState() {
        return { languages: [], menuItems: [] };
    },
    componentDidMount() {
        $.getJSON("/main.json", (data) => {
            data.menuItems.forEach((item) => {
                item.path = {};
                data.languages.forEach((language) => {
                    item.path[language] = "/" + language.toLowerCase() + "/" + slug(item.title[language]).toLowerCase();
                });
            });
            this.setState({languages: data.languages, menuItems: data.menuItems});
        });
    },
    render() {
        if (this.state.languages.length === 0 || this.state.menuItems.length === 0) {
            return <div></div>;
        } else {
            return (
                <Router>
                    <Route>
                        <Route path="/en" component={Root} activeLanguage="en" languages={this.state.languages} menuItems={this.state.menuItems} />
                        <Route path="/pt" component={Root} activeLanguage="pt" languages={this.state.languages} menuItems={this.state.menuItems} />
                        <Redirect from="/" to="/en" />
                    </Route>
                </Router>
            );
        }
    }
});

ReactDOM.render(<Main />, document.getElementById("root"))
