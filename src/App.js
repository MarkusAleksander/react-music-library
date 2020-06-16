import React, { Component } from "react";

import Search from "./containers/Search/Search";
import Modal from "./components/UI/Modal/Modal";

import axios from "./netlify_api.js";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            has_spotify_request_token: false,
        };
    }

    componentDidMount() {
        axios
            .get("/request-token")
            .then((res) => {
                axios.interceptors.request.use((config) => {
                    if (!config.params) {
                        config.params = {};
                    }
                    config.params["spotify_grant_token"] = res.data;
                    return config;
                });
                this.setState({
                    has_spotify_request_token: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const modal = !this.state.has_spotify_request_token ? (
            <Modal>
                <div>
                    <p>Requesting access token from Spotify...</p>
                </div>
            </Modal>
        ) : null;

        return (
            <div className="App">
                {modal}
                <Search />
            </div>
        );
    }
}

export default App;
