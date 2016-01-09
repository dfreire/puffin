import React from "react";

export default React.createClass({
    getInitialState() {
        return { items: [] };
    },
    componentDidMount() {
        $.getJSON("/navbar.json", (items) => {
            this.setState({items: items});
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

    }
});
