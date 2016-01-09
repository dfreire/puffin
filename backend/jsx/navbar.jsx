import React from "react";

export default React.createClass({
    getInitialState() {
        return { items: [], languages: [] };
    },
    componentDidMount() {
        $.getJSON("/navbar.json", (data) => {
            this.setState({items: data});
        });
        $.getJSON("/languages.json", (data) => {
            this.setState({languages: data});
        });
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
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Languages <span className="caret"></span></a>
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
        return this.state.items.map((item, i) => {
            return (
                <li key={i}><a href={item.path[this.props.lang]}>{item.title[this.props.lang]}</a></li>
            );
        });
    },
    _renderLanguages() {
        return this.state.languages.map((language, i) => {
            return (
                <li key={i}><a href="#">{language.title[this.props.lang]}</a></li>
            );
        });
    }
});
