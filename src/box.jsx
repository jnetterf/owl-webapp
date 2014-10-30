/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var Bootstrap = require("react-bootstrap");
var _ = require("lodash");

var DataItem = require("./dataItem.jsx");
var Types = require("./types.jsx");

/**
 * Renders an Owl box, which is a list of data items.
 */
var Box = React.createClass({
    render: function() {
        var style = _.extend(Types.toCSS(this.props.styles[this.props.box._style]), {
            width: this.props.box.geometryWidth,
            height: this.props.box.geometryHeight,
            marginLeft: this.props.box.geometryX,
            marginTop: this.props.box.geometryY,
            position: "absolute",
            border: "1px solid #dfdfdf",
            borderRadius: 3
        });
        return <div className="box" style={style}>
            <span style={{
                width: "100%",
                display: "inline-block",
                textAlign: "center" }}>{this.props.box._boxTitle}</span>
            <table>
            {_.map(this.props.box.dataItems,
                (dataItem) => <DataItem dataItem={dataItem}
                    key={dataItem.PObject._id}
                    data={this.props.data}
                    extremas={this.props.extremas}
                    styles={this.props.styles} />)}
            </table>
        </div>;
    },

    _prevHash: null,

    shouldComponentUpdate: function() {
        var hash = _.map(this.props.box.dataItems, (dataItem) =>
            this.props.data["(P" + dataItem.PObject._id + ")"]).join("_");
        var shouldUpdate = hash !== this._prevHash;
        this._prevHash = hash;
        return shouldUpdate;
    },

    propTypes: {
        box: Types.Box.isRequired,
        // data: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
        extremas: React.PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
        styles: React.PropTypes.objectOf(Types.Style.isRequired).isRequired
    }
});

module.exports = Box;
