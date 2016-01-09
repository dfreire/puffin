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
        return this.props.route.menuItems.map((item, i) => {
            return (
                <li key={i}><Link to={item.path[this.props.route.activeLanguage]}>{item.title[this.props.route.activeLanguage]}</Link></li>
            );
        });
    },
    _renderLanguages() {
        return this.props.route.languages.map((language, i) => {
            return (
                <li key={i}><Link to={`/${language}`}>{language.toUpperCase()}</Link></li>
            );
        });
    }
});
