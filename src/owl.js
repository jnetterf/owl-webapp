/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import React from "react";
import _ from "lodash";

/**
 * Renders an animated Owl. Because owls.
 */
export default class Owl extends React.Component {
    render() {
        const style = {
            width: this.props.owl.geometryWidth,
            height: this.props.owl.geometryHeight,
            marginLeft: this.props.owl.geometryX,
            marginTop: this.props.owl.geometryY,
            position: "absolute",
        };
        return <img className="owl" style={style} alt="An owl"
            src={"owl" + this.state.counter + ".png"} />
    }

    state = {
        counter: 0
    };

    componentDidMount() {
        _.delay(this._updateCounter, 500);
    }
    _mounted = true;

    componentDidUnmount() {
        this._mounted = false;
    }

    _updateCounter = () => {
        if (this._mounted) {
            this.setState({
                counter: (this.state.counter + 1) % 4
            });
            _.delay(this._updateCounter, 500);
        }
    }
}
