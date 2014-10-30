/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

var React = require("react");
var _ = require("lodash");

var PObject = React.PropTypes.shape({
    "_id": React.PropTypes.string.isRequired
});

var DataType = [
    "PMDI",
    "PNDI",
    "PTDI",
    "PDDI"
];

var DataItem = React.PropTypes.shape({
    PObject: PObject.isRequired,
    "_caption": React.PropTypes.string.isRequired,
    "_captionStyle": React.PropTypes.string.isRequired,
    "_defaultStyle": React.PropTypes.string.isRequired,
    "_extrema": React.PropTypes.bool,
    "_extremaID": React.PropTypes.string,
    "_format": React.PropTypes.string,
    "_source": React.PropTypes.string.isRequired,
    "type": React.PropTypes.oneOf(DataType).isRequired
});

var GeometryMixin = {
    "geometryHeight": React.PropTypes.number.isRequired,
    "geometryWidth": React.PropTypes.number.isRequired,
    "geometryX": React.PropTypes.number.isRequired,
    "geometryY": React.PropTypes.number.isRequired,
}

var Box = React.PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
    "_boxTitle": React.PropTypes.string.isRequired,
    "_style": React.PropTypes.string.isRequired,
    "dataItems": React.PropTypes.arrayOf(DataItem.isRequired).isRequired,
}, GeometryMixin));

var Extrema = React.PropTypes.shape({
    PObject: PObject.isRequired,
    "_high": React.PropTypes.number.isRequired,
    "_low": React.PropTypes.number.isRequired,
    "_name": React.PropTypes.string.isRequired,
    "_shigh": React.PropTypes.string.isRequired,
    "_slow": React.PropTypes.string.isRequired,
    "_sxhigh": React.PropTypes.string.isRequired,
    "_sxlow": React.PropTypes.string.isRequired,
    "_xhigh": React.PropTypes.number.isRequired,
    "_xlow": React.PropTypes.number.isRequired
});

var Owl = React.PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
}, GeometryMixin));

var Style = React.PropTypes.shape(_.extend({
    PObject: PObject.isRequired,
    "_bg": React.PropTypes.string.isRequired,
    "_bold": React.PropTypes.bool.isRequired,
    "_fg": React.PropTypes.string.isRequired,
    "_italic": React.PropTypes.bool.isRequired,
    "_linked": React.PropTypes.bool.isRequired,
    "_name": React.PropTypes.string.isRequired,
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

module.exports = {
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
