import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./store/actions";

import { Route, Switch } from "react-router-dom";

// * Components
import Modal from "./components/UI/Modal/Modal";

import Header from "./components/UI/Header/Header";
import Navigation from "./components/Navigation/Navigation";

// * Containers
import Search from "./containers/Search/Search";
import SavedArtists from "./containers/SavedArtists/SavedArtists";
import SavedAlbums from "./containers/SavedAlbums/SavedAlbums";

import axios from "./netlify_api.js";

import { REQUEST_TOKEN, GET_ALBUMS, GET_ARTISTS } from "./api_endpoints";

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
        console.log("[App:componentDidMount]");
        axios
            .get(REQUEST_TOKEN)
            .then((res) => {
                axios.interceptors.request.use((config) => {
                    if (!config.params) {
                        config.params = {};
                    }
                    config.params["spotify_grant_token"] = res.data;
                    return config;
                });
                console.log(
                    "[App:componentDidMount: updating spotify request token]"
                );
                this.setState({
                    has_spotify_request_token: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // * send request for saved album ids
        axios
            .get(GET_ALBUMS)
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

        // * send request for saved artist ids
        axios
            .get(GET_ARTISTS)
            .then((res) => {
                if (res.data) {
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            artist_id: res.data[keys[i]].artist_id,
                            gfb_id: keys[i],
                            status: "saved",
                        });
                    }
                    this.props.onStoreArtistIds(new_array);
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
                <Header>
                    <Navigation />
                </Header>
                <Switch>
                    <Route path="/search" component={Search} />
                    <Route path="/artists" component={SavedArtists} />
                    <Route path="/albums" component={SavedAlbums} />
                    <Route path="/" exact component={Search} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbums: (saved_album_ids) => {
            console.log("[onStoreAlbums]");
            dispatch({
                type: actionTypes.STORE_SAVED_ALBUM_IDS,
                saved_album_ids,
            });
        },
        onStoreArtistIds: (saved_artist_ids) => {
            dispatch({
                type: actionTypes.STORE_SAVED_ARTIST_IDS,
                saved_artist_ids,
            });
        },
    };
};

export default connect(null, mapDispatchToProps)(App);
