import React from "react";

export default React.createClass({
    propTypes: {
        blueprintURL: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <div>
                {this.props.blueprintURL}
            </div>
        );
    }
});
