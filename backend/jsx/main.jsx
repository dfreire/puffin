import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect} from "react-router";
import slug from "slug";
import Page from "./page.jsx";

const Root = React.createClass({
    render() {
        return (
            <Page route={this.props.route} />
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
                        <Redirect from="/" to={this.state.menuItems[0].path[this.state.languages[0]]} />
                        {this._renderRoutes()}
                    </Route>
                </Router>
            );
        }
    },
    _renderRoutes() {
        let routes = [];
        this.state.menuItems.forEach((item, i) => {
            this.state.languages.forEach((language, j) => {
                routes.push(
                    <Route key={i*j} path={item.path[language]} component={Page} activePage={item} activeLanguage={language} languages={this.state.languages} menuItems={this.state.menuItems} />
                );
            });
        });
        return routes;
    }
});

ReactDOM.render(<Main />, document.getElementById("root"))
