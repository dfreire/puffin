import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect, Link} from "react-router";
import List from "./components/list.jsx";

const Navbar = React.createClass({
    propTypes: {
        activePath: React.PropTypes.string.isRequired,
        activeLanguage: React.PropTypes.string.isRequired,
        languages: React.PropTypes.array.isRequired,
        menuItems: React.PropTypes.array.isRequired
    },
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to={`/${this.props.activeLanguage}`}>
                            <img alt="Brand" src="/puffin.png" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {this._renderItems()}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.activeLanguage.toUpperCase()} <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    {this._renderLanguages()}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    },
    _renderItems() {
        return this.props.menuItems.map((menuItem, i) => {
            let className = (this.props.activePath === menuItem.path) ? "active" : "";
            return (
                <li key={i} className={className}><Link to={menuItem.path}>{menuItem.title}</Link></li>
            );
        });
    },
    _renderLanguages() {
        return this.props.languages.map((language, i) => {
            let to = this.props.activePath.replace(`/${this.props.activeLanguage}`, `/${language}`);
            return (
                <li key={i}><Link to={to}>{language.toUpperCase()}</Link></li>
            );
        });
    }
});


const Page = React.createClass({
    getInitialState() {
        return { blueprint: undefined };
    },
    componentDidMount() {
        this._fetchBlueprint();
    },
    componentDidUpdate (prevProps) {
        if (this.props.route.blueprintURL !== prevProps.route.blueprintURL) {
            this._fetchBlueprint();
        }
    },
    _fetchBlueprint() {
        console.log("_fetchBlueprint", this.props.route.blueprintURL);
        $.getJSON(this.props.route.blueprintURL, (blueprint) => {
            this.setState({ blueprint: blueprint });
        });
    },
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
                    {this._renderContent()}
                </div>
            </div>
        );
    },
    _renderContent() {
        if (this.state.blueprint) {
            switch (this.state.blueprint.type) {
                case "list":
                    return (<List activeLanguage={this.props.route.activeLanguage} blueprint={this.state.blueprint}></List>);
                default:
                    return (<div>{JSON.stringify(this.state.blueprint)}</div>);
            }
        }
    }
});

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
                                blueprintURL={route.blueprintURL}
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
                        activeLanguage: language,
                        blueprintURL: path.replace("/:language", "/blueprints") + "/index.json"
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
