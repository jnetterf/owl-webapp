/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import PropTypes from 'prop-types';
import React from "react";

import Types from "./types";

/**
 * Renders a title and a value.
 */
export default class DataItem extends React.Component {
    render() {
        this._lastVal = this.props.data["(P" + this.props.dataItem.PObject._id + ")"][0];
        const styleId = this.getStyleId();
        const captionStyleId = this.props.dataItem._captionStyle;
        const val = this.getVal();
        return <tr className="item" style={{fontSize: 10}} fmt={this.props.dataItem._format}>
            <td className="caption" style={Types.toCSS(this.props.styles[captionStyleId])}>
                {this.props.dataItem._caption}
            </td>
            <td className="value" style={Types.toCSS(this.props.styles[styleId])}>
                {val}
            </td>
        </tr>;
    }

    _lastVal = null;

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data["(P" + this.props.dataItem.PObject._id + ")"][0] !== this._lastVal;
    }

    getStyleId() {
        const dataItem = this.props.dataItem;
        // return "(P" + this.props.data["(P" + dataItem.PObject._id + ")"][1] + ")";
        const hasExtrema = dataItem._extrema;
        if (!hasExtrema) {
            return dataItem._defaultStyle;
        };
        const extrema = this.props.extremas[dataItem._extremaID];
        const val = this.getVal();
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
    }

    getVal() {
        const dataItem = this.props.dataItem;
        const rawVal = this.props.data["(P" + dataItem.PObject._id + ")"][0];
        const type = dataItem.type;
        switch(type) {
            case "PMDI":
            case "PTDI":
            case "PDDI":
            default:
                return rawVal;
            case "PNDI":
                return 1*rawVal;
        }
    }

    static propTypes = {
        dataItem: Types.DataItem.isRequired,
        extremas: PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
        styles: PropTypes.objectOf(Types.Style.isRequired).isRequired
    }
}
