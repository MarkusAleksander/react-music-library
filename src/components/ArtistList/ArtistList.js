import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Artist from "./../Artist/Artist";

import axios from "./../../netlify_api.js";

class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 6,
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
            prevProps.saved_artists !== this.props.saved_artists
        ) {
            console.log("[ArtistList:componentDidUpdate:props don't match]");
            this.processArtistData();
        } else {
            console.log("[ArtistList:componentDidUpdate:props match]");
        }
    }

    processArtistData = () => {
        let saved_artist_ids = [];
        this.props.saved_artists.forEach((artist) => {
            saved_artist_ids.push(artist.artist_id);
        });
        let processed_artists = this.props.artists.items
            .slice(0, this.state.max_display_results)
            .map((artist) => {
                let is_saved = saved_artist_ids.includes(artist.id);

                return {
                    artist_title: artist.name,
                    artist_id: artist.id,
                    artist_image:
                        artist.images[0] && artist.images[0].url
                            ? artist.images[0].url
                            : null,
                    is_saved,
                };
            });

        this.setState({
            processed_artists: processed_artists,
        });
    };

    onSaveHandler = (id) => {
        let is_saved = this.props.saved_artists.find((artist) => {
            return artist.artist_id === id;
        });

        if (is_saved) {
            let artist = is_saved;

            axios
                .post("/unsave-artist", {
                    artist_id: artist.artist_id,
                    gfb_id: artist.gfb_id,
                })
                .then((res) => {
                    if (res.status === 200 && res.data.success_id) {
                        this.props.onRemoveArtist(res.data.success_id);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .post("/save-artist", {
                    artist_id: id,
                })
                .then((res) => {
                    if (res.status === 200 && res.data.success_id) {
                        this.props.onStoreArtist({
                            gfb_id: res.data.success_id,
                            artist_id: id,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
        onStoreArtist: (artist_data) =>
            dispatch({
                type: actionTypes.STORE_ARTIST,
                artist_data,
            }),
        onRemoveArtist: (gfb_id) =>
            dispatch({
                type: actionTypes.REMOVE_ARTIST,
                gfb_id,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_artists: state.artists.artists,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
