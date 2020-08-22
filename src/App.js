import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./store/actions";

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

        // * send request for saved albums
        axios
            .get("/get-saved-albums")
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            album_id: res.data[keys[i]].album_id,
                            status: res.data[keys[i]].status,
                            gfb_id: keys[i],
                        });
                    }
                    this.props.onStoreAlbums(new_array);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get-saved-artists")
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    // returns object - convert to array
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            artist_id: res.data[keys[i]].artist_id,
                            gfb_id: keys[i],
                            status: "saved",
                        });
                    }
                    this.props.onStoreArtists(new_array);
                }
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

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbums: (album_data) => {
            console.log("[onStoreAlbums]");
            dispatch({
                type: actionTypes.STORE_ALBUMS,
                album_data,
            });
        },
        onStoreArtists: (artist_data) => {
            dispatch({
                type: actionTypes.STORE_ARTISTS,
                artist_data,
            });
        },
    };
};

export default connect(null, mapDispatchToProps)(App);
