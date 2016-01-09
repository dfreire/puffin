import React from "react";

export default React.createClass({
    propTypes: {
        blueprint: React.PropTypes.object.isRequired,
        activeLanguage: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <table className="table table-striped table-hover table-bordered">
                {this._renderHead()}
            </table>
        );
    },
    _renderHead() {
        if (this.props.blueprint.showFieldLabels) {
            return (
                <thead>
                    <tr>
                        {this.props.blueprint.fields.map((field, i) => {
                            return <td key={i}>{field.label[this.props.activeLanguage]}</td>
                        })}
                    </tr>
                </thead>
            );
        }
    }
});
