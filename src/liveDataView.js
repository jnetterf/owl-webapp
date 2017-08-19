/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import React from "react";
import _ from "lodash";

import Box from "./box";
import Owl from "./owl";

/**
 * Renders a collection of Owl boxes.
 */
export default class LiveDataView extends React.Component {
    render() {
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
    //     data: PropTypes.shape({
    //         data: PropTypes.objectOf(PropTypes.string).isRequired,
    //         statics: PropTypes.shape({
    //             "OWL FILE rev.": PropTypes.string.isRequired,
    //             "boxes": PropTypes.objectOf(Types.Box.isRequired).isRequired,
    //             "extremas": PropTypes.objectOf(Types.Extrema.isRequired).isRequired,
    //             "owls": PropTypes.objectOf(Types.Owl.isRequired).isRequired,
    //             "styles": PropTypes.objectOf(Types.Style.isRequired).isRequired
    //         })
    //     }).isRequired
    // }
}

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
