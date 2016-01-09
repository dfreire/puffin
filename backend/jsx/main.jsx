import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect} from "react-router";
import Page from "./page.jsx";

const Main = React.createClass({
    getInitialState() {
        return { blueprint: undefined };
    },
    componentDidMount() {
        $.getJSON("/blueprints/index.json", (blueprint) => {
            this.setState({blueprint: blueprint});
        });
    },
    render() {
        if (this.state.blueprint) {
            return this._renderRoutes();
        } else {
            return (<div></div>);
        }
    },
    _renderRoutes() {
        return (
            <Router>
                <Route>
                    {this._getExpandedRoutes().map((route, i) => {
                        return (
                            <Route key={i} path={route.path} component={Page}
                                title={route.title}
                                activeLanguage={route.activeLanguage}
                                languages={this.state.blueprint.languages}
                                menuItems={this._getMenuItemsForLanguage(route.activeLanguage)}
                            />
                        );
                    })}
                    {this._getExpandedRedirects().map((redirect, i) => {
                        return (
                            <Redirect key={i} from={redirect.from} to={redirect.to} />
                        );
                    })}
                </Route>
            </Router>
        );
    },
    _getExpandedRoutes() {
        let expanded = [];
        _.each(this.state.blueprint.routes, (pathProps, path) => {
            if (path.indexOf(":language") >= 0) {
                this.state.blueprint.languages.forEach((language) => {
                    expanded.push({
                        path: path.replace(/:language/g, language),
                        title: pathProps.title[language],
                        activeLanguage: language
                    });
                });
            } else {
                throw "Route path has no :language!! " + path;
            }
        });
        return expanded;
    },
    _getExpandedRedirects() {
        let expanded = [];
        _.each(this.state.blueprint.redirects, (to, from) => {
            if (from.indexOf(":language") >= 0) {
                this.state.blueprint.languages.forEach((language) => {
                    expanded.push({
                        from: from.replace(/:language/g, language),
                        to: to.replace(/:language/g, language)
                    });
                });
            } else {
                expanded.push({ from: from, to: to });
            }
        });
        return expanded;
    },
    _getMenuItemsForLanguage(language) {
        return _.map(this.state.blueprint.menuItems, (menuItem) => {
            return {
                path: menuItem.path.replace(/:language/g, language),
                title: this.state.blueprint.routes[menuItem.path].title[language]
            };
        });
    },
});

ReactDOM.render(<Main/>, document.getElementById("root"))
