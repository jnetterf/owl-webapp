/**
 * @copyright (C) Joshua Netterfield. Released under a BSD-style license.
 * Written by Joshua Netterfield <joshua@nettek.ca>, September 2014
 */

import React from "react";
import {Alert} from "react-bootstrap";
import _ from "lodash";

import LiveDataView from "./liveDataView";

/**
 * The root object. Renders the URL selector, and connects to Owl's websocket.
 * Delegates the data rendering to LiveDataView.
 */
export default class Application extends React.Component {
    state = {
        server: window.localStorage["server"] || "",
        connected: false,
        loading: false
    };

    render() {
        return <div className="home">
            <Alert bsStyle={this.state.connected ? "info" : "danger"}>
                <form className="form-horizontal form-small header">
                    <input type="text"
                        className="serverName"
                        ref={input => this._input = input}
                        value={this.state.server}
                        placeholder="ws://localhost:8008"
                        onChange={this.handleChange} />
                </form>
            </Alert>
            {this.state.loading && <div className="throbber">
                <i className="fa-circle-o-notch fa-spin fa-4x fa" /></div>}
            {this.state.data && <LiveDataView data={this.state.data} />}
        </div>;
    }

    _input = null;
    handleChange = () => {
        const srv = this._input.value;
        this.setState({
            server: srv,
            data: null
        });
        window.localStorage["server"] = srv;
        this.tryToConnect(srv);
    }

    componentDidMount() {
        this.tryToConnect();
    }

    tryToConnect = (srv) => {
        this.setState({
            connected: false,
            loading: true
        });

        try {
            console.log(srv, this.state.server);
            this._ws = new WebSocket(srv || this.state.server);
            this._ws.onmessage = this._handleOwlMessage;
            this._ws.onerror = this._handleOwlError;
            this._ws.onopen = this._handleOwlOpened;
            this._ws.onclose = this._handleOwlError;
        } catch(err) {
            this._handleOwlError();
        }
    }

    _handleOwlMessage = (msg) => {
        const data = JSON.parse(msg.data);
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
    }

    _handleOwlError = (err) => {
        this.setState({
            connected: false,
            loading: false
        });
    }

    _handleOwlOpened = () => {
        this.setState({
            connected: true,
            loading: false
        });
    }

    _ws = null;
}
