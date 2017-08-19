/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import PropTypes from 'prop-types';
import React from "react";
import _ from "lodash";

import DataItem from "./dataItem";
import Types from "./types";

/**
 * Renders an Owl box, which is a list of data items.
 */
export default class Box extends React.Component {
    render() {
        const style = _.extend(Types.toCSS(this.props.styles[this.props.box._style]), {
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
    }

    _prevHash = null;

    shouldComponentUpdate() {
        const hash = _.map(this.props.box.dataItems, (dataItem) =>
            this.props.data["(P" + dataItem.PObject._id + ")"]).join("_");
        const shouldUpdate = hash !== this._prevHash;
        this._prevHash = hash;
        return shouldUpdate;
    }

    static propTypes = {
        box: Types.Box.isRequired,
        // data: PropTypes.objectOf(PropTypes.string).isRequired,
        extremas: PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
        styles: PropTypes.objectOf(Types.Style.isRequired).isRequired
    }
}
