/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var Bootstrap = require("react-bootstrap");
var _ = require("lodash");
var sprintf = require("sprintf-js").sprintf;

var Types = require("./types.jsx");

/**
 * Renders a title and a value.
 */
var DataItem = React.createClass({
    render: function() {
        this._lastVal = this.props.data["(P" + this.props.dataItem.PObject._id + ")"][0];
        var styleId = this.getStyleId();
        var captionStyleId = this.props.dataItem._captionStyle;
        var val = this.getVal();
        return <tr className="item" style={{fontSize: 10}} fmt={this.props.dataItem._format}>
            <td className="caption" style={Types.toCSS(this.props.styles[captionStyleId])}>
                {this.props.dataItem._caption}
            </td>
            <td className="value" style={Types.toCSS(this.props.styles[styleId])}>
                {val}
            </td>
        </tr>;
    },

    _lastVal: null,

    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.data["(P" + this.props.dataItem.PObject._id + ")"][0] !== this._lastVal;
    },

    getStyleId: function() {
        var dataItem = this.props.dataItem;
        return "(P" + this.props.data["(P" + dataItem.PObject._id + ")"][1] + ")";
        var hasExtrema = dataItem._extrema;
        if (!hasExtrema) {
            return dataItem._defaultStyle;
        };
        var extrema = this.props.extremas[dataItem._extremaID];
        var val = this.getVal();
        if (val >= extrema._xhigh) {
            return extrema._sxhigh;
        } else if (val >= extrema._high) {
            return extrema._shigh;
        } else if (val <= extrema.xlow) {
            return extrema._sxlow;
        } else if (val <= extrema.low) {
            return extrema._slow;
        }

        return dataItem._defaultStyle;
    },

    getVal: function() {
        var dataItem = this.props.dataItem;
        var rawVal = this.props.data["(P" + dataItem.PObject._id + ")"][0];
        var type = dataItem.type;
        var fmt = dataItem._format;
        switch(type) {
            case "PMDI":
            case "PTDI":
            case "PDDI":
                return rawVal;
                break;
            case "PNDI":
                return 1*rawVal;
                break;
        }
    },

    propTypes: {
        dataItem: Types.DataItem.isRequired,
        extremas: React.PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
        styles: React.PropTypes.objectOf(Types.Style.isRequired).isRequired
    }
});

module.exports = DataItem;
