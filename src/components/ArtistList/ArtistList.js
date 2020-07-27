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
        };
    }

    componentDidMount() {
        console.log("[ArtistList:componentDidMount]");
    }

    componentDidUpdate(prevProps) {
        console.log("[ArtistList:componentDidUpdate]");
        if (prevProps.artist_data !== this.props.artist_data) {
            console.log("[ArtistList:componentDidUpdate:props don't match]");
        } else {
            console.log("[ArtistList:componentDidUpdate:props match]");
        }
    }

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
                {this.props.artist_data.map((artist) => (
                    <li
                        key={artist.artist_id}
                        className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                    >
                        <Artist
                            artist_title={artist.artist_title}
                            artist_image={artist.artist_image}
                            actions={[
                                {
                                    onClick: () =>
                                        this.onSaveHandler(artist.artist_id),
                                    content: artist.is_saved
                                        ? "Remove"
                                        : "Save",
                                    status: "",
                                    className: artist.is_saved
                                        ? "is-primary"
                                        : "is-info",
                                },
                            ]}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        saved_artists: state.artists.artists,
    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
