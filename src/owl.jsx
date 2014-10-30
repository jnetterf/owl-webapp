/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var Bootstrap = require("react-bootstrap");
var _ = require("lodash");

/**
 * Renders an animated Owl. Because owls.
 */
var Owl = React.createClass({
    render: function() {
        var style = {
            width: this.props.owl.geometryWidth,
            height: this.props.owl.geometryHeight,
            marginLeft: this.props.owl.geometryX,
            marginTop: this.props.owl.geometryY,
            position: "absolute",
        };
        return <img className="owl" style={style}
            src={"/res/owl" + this.state.counter + ".png"} />
    },

    getInitialState: function() {
        return {
            counter: 0
        };
    },

    componentDidMount: function() {
        _.delay(this._updateCounter, 500);
    },

    _updateCounter: function() {
        if (this.isMounted()) {
            this.setState({
                counter: (this.state.counter + 1) % 4
            });
            _.delay(this._updateCounter, 500);
        }
    }
});

module.exports = Owl;
