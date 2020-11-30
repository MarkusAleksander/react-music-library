import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

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

import {
    REQUEST_SPOTIFY_TOKEN,
} from "./api_endpoints";

import "bulma/css/bulma.css";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            has_spotify_REQUEST_SPOTIFY_TOKEN: false,
        };
    }

    componentDidMount() {
        console.log("[App:componentDidMount]");
        axios
            .get(REQUEST_SPOTIFY_TOKEN)
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
                    has_spotify_REQUEST_SPOTIFY_TOKEN: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        // * send request for saved album ids
        // * request stored album ids
        this.props.requestStoredAlbumIDs();
        // * request stored artist ids
        this.props.requestStoredArtistIDs();
    }

    render() {
        const modal = !this.state.has_spotify_REQUEST_SPOTIFY_TOKEN ? (
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
        requestStoredAlbumIDs: () => {
            dispatch(
                actionCreators.request_saved_album_ids()
            )
        },
        requestStoredArtistIDs: () => {
            dispatch(
                actionCreators.request_saved_artist_ids()
            )
        },
    };
};

export default connect(null, mapDispatchToProps)(App);
