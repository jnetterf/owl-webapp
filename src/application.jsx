/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

/** @jsx React.DOM */

var React = require("react");
var Bootstrap = require("react-bootstrap");
var _ = require("lodash");

var LiveDataView = require("./liveDataView.jsx");

/**
 * The root object. Renders the URL selector, and connects to Owl's websocket.
 * Delegates the data rendering to LiveDataView.
 */
var Application = React.createClass({
    render: function() {
        return <div className="home">
            <Bootstrap.Alert bsStyle={this.state.connected ? "info" : "danger"} >
                <form className="form-horizontal form-small header">
                    <Bootstrap.Input type="text"
                        className="serverName"
                        label="Owl Web Client"
                        labelClassName="col-xs-3"
                        wrapperClassName="col-xs-9"
                        ref="input"
                        value={this.state.server}
                        placeholder="ws://localhost:8008"
                        onChange={this.handleChange} />
                </form>
            </Bootstrap.Alert>
            {this.state.loading && <div className="throbber">
                <i className="fa-circle-o-notch fa-spin fa-4x fa" /></div>}
            {this.state.data && <LiveDataView data={this.state.data} />}
        </div>;
    },

    handleChange: function() {
        var srv = this.refs.input.getValue();
        this.setState({
            server: srv,
            data: null
        });
        window.localStorage["server"] = srv;
        this.tryToConnect(srv);
    },

    componentDidMount: function() {
        this.tryToConnect();
    },

    tryToConnect: function(srv) {
        this.setState({
            connected: false,
            loading: true
        });

        try {
            this._ws = new WebSocket(srv || this.state.server);
            this._ws.onmessage = this._handleOwlMessage;
            this._ws.onerror = this._handleOwlError;
            this._ws.onopen = this._handleOwlOpened;
            this._ws.onclose = this._handleOwlError;
        } catch(err) {
            this._handleOwlError();
        }
    },

    _handleOwlMessage: function(msg) {
        var data = JSON.parse(msg.data);
        data.statics = LiveDataView.indexStaticsByKeys(data.statics);

        if (!this.state.data) {
            this.setState({
                data: data
            });
        } else {
            this.setState({
                data: _.merge(this.state.data, data)
            });
        }
    },

    _handleOwlError: function() {
        this.setState({
            connected: false,
            loading: false
        });
    },

    _handleOwlOpened: function() {
        this.setState({
            connected: true,
            loading: false
        });
    },

    _ws: null,

    getInitialState: function() {
        return {
            server: window.localStorage["server"] || "",
            connected: false,
            loading: false
        }
    }
});

module.exports = Application;
