/**
 * @file Starts the Hawk Owl webapp.
 * 
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import React from "react";
import ReactDOM from "react-dom";
import Application from "./application";

(function main() {
    ReactDOM.render(<Application />, document.body);
}());
