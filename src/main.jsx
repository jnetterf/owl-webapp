/**
 * @file Starts the Hawk Owl webapp.
 * 
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var ReactPerf = require("react/lib/ReactDefaultPerf");
var Application = require("./application.jsx");

(function main() {
    "use strict";
    React.renderComponent(<Application />, document.body);
    window.React = React; // For React Chrome developer extension
    window.ReactPerf = ReactPerf; // For Profiling
}());
