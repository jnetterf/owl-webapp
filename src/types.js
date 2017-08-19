/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import PropTypes from 'prop-types';
import _ from "lodash";

const PObject = PropTypes.shape({
    "_id": PropTypes.string.isRequired
});

const DataType = [
    "PMDI",
    "PNDI",
    "PTDI",
    "PDDI"
];

const DataItem = PropTypes.shape({
    PObject: PObject.isRequired,
    "_caption": PropTypes.string.isRequired,
    "_captionStyle": PropTypes.string.isRequired,
    "_defaultStyle": PropTypes.string.isRequired,
    "_extrema": PropTypes.bool,
    "_extremaID": PropTypes.string,
    "_format": PropTypes.string,
    "_source": PropTypes.string.isRequired,
    "type": PropTypes.oneOf(DataType).isRequired
});

const GeometryMixin = {
    "geometryHeight": PropTypes.number.isRequired,
    "geometryWidth": PropTypes.number.isRequired,
    "geometryX": PropTypes.number.isRequired,
    "geometryY": PropTypes.number.isRequired,
}

const Box = PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
    "_boxTitle": PropTypes.string.isRequired,
    "_style": PropTypes.string.isRequired,
    "dataItems": PropTypes.arrayOf(DataItem.isRequired).isRequired,
}, GeometryMixin));

const Extrema = PropTypes.shape({
    PObject: PObject.isRequired,
    "_high": PropTypes.number.isRequired,
    "_low": PropTypes.number.isRequired,
    "_name": PropTypes.string.isRequired,
    "_shigh": PropTypes.string.isRequired,
    "_slow": PropTypes.string.isRequired,
    "_sxhigh": PropTypes.string.isRequired,
    "_sxlow": PropTypes.string.isRequired,
    "_xhigh": PropTypes.number.isRequired,
    "_xlow": PropTypes.number.isRequired
});

const Owl = PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
}, GeometryMixin));

const Style = PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
    "_bg": PropTypes.string.isRequired,
    "_bold": PropTypes.bool.isRequired,
    "_fg": PropTypes.string.isRequired,
    "_italic": PropTypes.bool.isRequired,
    "_linked": PropTypes.bool.isRequired,
    "_name": PropTypes.string.isRequired,
}));

function toCSS(style) {
    if (!style) {
        return {};
    }
    return {
        backgroundColor: style._bg === "#ffffff" ? undefined : style._bg,
        color: style._fg,
        weight: style._bold ? "bold" : "normal",
        fontStyle: style._italic ? "italic" : "normal",
    };
}

const Types = {
    PObject: PObject,
    DataType: DataType,
    DataItem: DataItem,
    GeometryMixin: GeometryMixin,
    Box: Box,
    Extrema: Extrema,
    Owl: Owl,
    Style: Style,
    toCSS: toCSS
}

export default Types;
