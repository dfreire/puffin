import React from "react";
import {Link} from "react-router";

export default React.createClass({
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
                            <span className="sr-only">Toggle navigation</span>
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
