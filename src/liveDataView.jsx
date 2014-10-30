/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var Bootstrap = require("react-bootstrap");
var _ = require("lodash");

var Box = require("./box.jsx");
var Owl = require("./owl.jsx");
var Types = require("./types.jsx");

/**
 * Renders a collection of Owl boxes.
 */
var LiveDataView = React.createClass({
    render: function() {
        return <div className="dataView">
            {_.map(this.props.data.statics.boxes,
                (box) => <Box box={box}
                    key={box.PObject._id}
                    data={this.props.data.data}
                    extremas={this.props.data.statics.extremas}
                    styles={this.props.data.statics.styles} />)}
            {_.map(this.props.data.statics.owls, (owl, idx) => <Owl key={"owl-" + idx} owl={owl} />)}
        </div>;
    }
    // propTypes: {
    //     data: React.PropTypes.shape({
    //         data: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    //         statics: React.PropTypes.shape({
    //             "OWL FILE rev.": React.PropTypes.string.isRequired,
    //             "boxes": React.PropTypes.objectOf(Types.Box.isRequired).isRequired,
    //             "extremas": React.PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
    //             "owls": React.PropTypes.objectOf(Types.Owl.isRequired).isRequired,
    //             "styles": React.PropTypes.objectOf(Types.Style.isRequired).isRequired
    //         })
    //     }).isRequired
    // }
});

LiveDataView.indexStaticsByKeys = function(statics) {
    if (!statics) {
        return {};
    }
    return _.extend(statics, {
        "boxes": _.indexBy(statics.boxes, getPObjectIDString),
        "extremas": _.indexBy(statics.extremas, getPObjectIDString),
        "owls": _.indexBy(statics.owls, getPObjectIDString),
        "styles": _.indexBy(statics.styles, getPObjectIDString)
    });
}

function getPObjectIDString(obj) {
    return "(P" + obj.PObject._id + ")";
}

module.exports = LiveDataView;
