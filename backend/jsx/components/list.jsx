import React from "react";

export default React.createClass({
    propTypes: {
        blueprint: React.PropTypes.object.isRequired,
        activeLanguage: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    {/*<div className="col-md-4">{this._renderFilter()}</div>*/}
                    <div className="col-md-12">{this._renderTable()}</div>
                </div>
            </div>
        );
    },
    _renderFilter() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="pull-left"><h3 className="panel-title">Filter</h3></div>
                    <div className="pull-right">
                        <a href="#">clear</a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">
                    {this.props.blueprint.fields.map((field, i) => {
                        let label = field.label[this.props.activeLanguage];
                        return (
                            <div key={i} className="form-group">
                                <input type="text" className="form-control" placeholder={label} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
    _renderHeading() {
        return (
            <div className="panel-heading">
                <div className="pull-left"><h3 className="panel-title">Users</h3></div>
                <div className="pull-right">
                    <a href="#" style={{paddingLeft: 20}}>create</a>
                    <a href="#" style={{paddingLeft: 20}}>update</a>
                    <a href="#" style={{paddingLeft: 20}}>remove</a>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    },
    _renderTable() {
        return (
            <div className="panel panel-default">
                {this._renderHeading()}
                <div className="panel-body">
                    <div className="form-group">
                        <input type="text" className="form-control" />
                    </div>
                    <table className="table table-striped table-hover">
                        {this._renderHead()}
                        {this._renderBody()}
                    </table>
                </div>
                <div className="panel-footer" style={{paddingTop: 5, paddingBottom: 0}}>{this._renderPagination()}</div>
            </div>
        );
    },
    _renderHead() {
        if (this.props.blueprint.showFieldLabels) {
            return (
                <thead>
                    <tr>
                        <th style={{width: 40}}><input type="checkbox" /></th>
                        {this.props.blueprint.fields.map((field, i) => {
                            return <th key={i}>{field.label[this.props.activeLanguage]}</th>
                        })}
                    </tr>
                </thead>
            );
        }
    },
    _renderBody() {
        return (
            <tbody>
                <tr>
                    <td><input type="checkbox" /></td>
                    {this.props.blueprint.fields.map((field, i) => {
                        return <td key={i}>{field.label[this.props.activeLanguage]}</td>
                    })}
                </tr>
            </tbody>
        );
    },
    _renderPagination() {
        return (
            <nav style={{textAlign: "center"}}>
                <ul className="pagination" style={{margin: 0}}>
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});
