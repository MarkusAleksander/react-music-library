import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Artist from "./../Artist/Artist";

import axios from "./../../netlify_api.js";

import { SAVE_ARTIST, DELETE_ARTIST } from "./../../api_endpoints";

class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 0,
            processed_artists: [],
        };
    }

    componentDidMount() {
        console.log("[ArtistList:componentDidMount]");
        this.processArtistData();
    }

    componentDidUpdate(prevProps) {
        console.log("[ArtistList:componentDidUpdate]");
        if (
            prevProps.artists !== this.props.artists ||
            prevProps.saved_artist_ids !== this.props.saved_artist_ids
        ) {
            console.log("[ArtistList:componentDidUpdate:props don't match]");
            this.processArtistData();
        } else {
            console.log("[ArtistList:componentDidUpdate:props match]");
        }
    }

    processArtistData = () => {
        let saved_id_list = this.props.saved_artist_ids.map(
            (artist) => artist.artist_id
        );

        let processed_artists = this.props.artists
            .slice(
                0,
                this.state.max_display_results
                    ? this.state.max_display_results
                    : this.props.artists.length
            )
            .map((artist) => {
                return {
                    artist_title: artist.name,
                    artist_id: artist.id,
                    artist_image:
                        artist.images[0] && artist.images[0].url
                            ? artist.images[0].url
                            : null,
                    status: saved_id_list.includes(artist.id) ? "saved" : null,
                };
            });

        this.setState({
            processed_artists: processed_artists,
        });
    };

    onSaveHandler = (artist_id) => {
        let saved_artist = this.props.saved_artist_ids.find((artist) => {
            return artist.artist_id === artist_id;
        });

        let endpoint, onResponse, onError, options, prevState;

        // * is saved, so we're deleting
        if (saved_artist && saved_artist.status === "saved") {
            endpoint = DELETE_ARTIST;

            options = {
                artist_id: saved_artist.artist_id,
                gfb_id: saved_artist.gfb_id,
            };

            // * set artist to loading
            prevState = saved_artist.status;
            // TODO - needed when doing the same further down?
            saved_artist.status = "loading";

            let artists = [...this.state.processed_artists];
            let artist = artists.find(
                (artist) => artist.artist_id === artist_id
            );

            artist.status = "loading";

            this.setState({
                processed_artists: artists,
            });

            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    this.props.onRemoveArtist({
                        gfb_id: res.data.success_id,
                        artist_id: artist_id,
                    });
                }
            };

            onError = (err) => {
                let artists = [...this.state.processed_artists];
                let artist = artists.find(
                    (artist) => artist.artist_id === artist_id
                );

                artist.status = prevState;

                this.setState({
                    processed_artists: artists,
                });
            };
        }
        // * isn't saved, so we're saving
        else {
            endpoint = SAVE_ARTIST;

            options = {
                artist_id,
            };

            let artists = [...this.state.processed_artists];
            let artist = artists.find(
                (artist) => artist.artist_id === artist_id
            );

            artist.status = "loading";

            this.setState({
                processed_artists: artists,
            });

            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    this.props.onStoreArtist({
                        gfb_id: res.data.success_id,
                        artist_id: artist_id,
                        status: "saved",
                    });
                }
            };

            onError = (err) => {
                let artists = [...this.state.processed_artists];
                let artist = artists.find(
                    (artist) => artist.artist_id === artist_id
                );

                artist.status = prevState;

                this.setState({
                    processed_artists: artists,
                });
            };
        }

        axios
            .post(endpoint, options)
            .then(onResponse)
            .catch(onError);
    };

    render() {
        return (
            <ul className="columns is-mobile is-multiline">
                {this.state.processed_artists.map((artist) => (
                    <li
                        key={artist.artist_id}
                        className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                    >
                        <Artist
                            artist={artist}
                            on_action={this.onSaveHandler}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreArtist: (artist_to_add) =>
            dispatch({
                type: actionTypes.ADD_ARTIST,
                artist_to_add,
            }),
        onRemoveArtist: (artist_to_remove) =>
            dispatch({
                type: actionTypes.REMOVE_ARTIST,
                artist_to_remove,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_artist_ids: state.artists.saved_artist_ids,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
