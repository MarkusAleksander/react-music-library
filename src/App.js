import React, { Component } from "react";
import Search from "./containers/Search/Search";

import axios from "./netlify_api.js";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/request-token")
            .then((res) => {
                axios.interceptors.request.use((config) => {
                    config.params["spotify_grant_token"] = res.data;
                    return config;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="App">
                <Search />
            </div>
        );
    }
}

export default App;
