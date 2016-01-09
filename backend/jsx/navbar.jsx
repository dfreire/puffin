import React from "react";
import {Link} from "react-router";

export default React.createClass({
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src="/puffin.png" />
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {this._renderItems()}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.route.activeLanguage.toUpperCase()} <span className="caret"></span></a>
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
        let activePath = this.props.route.activePage.path[this.props.route.activeLanguage];
        return this.props.route.menuItems.map((item, i) => {
            let to = item.path[this.props.route.activeLanguage];
            let caption = item.title[this.props.route.activeLanguage];
            let className = (activePath === to) ? "active" : "";
            return (
                <li key={i} className={className}><Link to={to}>{caption}</Link></li>
            );
        });
    },
    _renderLanguages() {
        return this.props.route.languages.map((language, i) => {
            let to = this.props.route.activePage.path[language];
            let caption = language.toUpperCase() + " - " + this.props.route.activePage.title[language];
            return (
                <li key={i}><Link to={to}>{caption}</Link></li>
            );
        });
    }
});
