import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "./../../store/actions/index";

import Artist from "./../Artist/Artist";

import axios from "./../../netlify_api.js";

import { SAVE_ARTIST, DELETE_ARTIST } from "./../../api_endpoints";
import Modal from "../UI/Modal/Modal";

class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 0,
            processed_artists: [],
            display_blocked_modal: false,
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
        let saved_id_list = this.props.saved_artist_ids
            .flat()
            .map((artist) => artist.artist_id);
        // debugger;
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
                    genres: artist.genres,
                };
            });

        this.setState({
            processed_artists: processed_artists,
        });
    };

    onSaveHandler = (artist_obj) => {
        if (window.location.host.indexOf("localhost") < 0) {
            this.setState({
                display_blocked_modal: true,
            });
            return;
        }

        // * get artist id
        let artist_id = artist_obj.artist_id;

        let saved_artist = this.props.saved_artist_ids.flat().find((artist) => {
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

            let artist_title = artist_obj.artist_title;

            options = {
                artist_id,
                artist_title
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
                        artist_title: artist_title,
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

    // onViewDetailHandler = (artist_id) => {
    //     let saved_artist = this.props.saved_artist_ids.find((artist) => {
    //         return artist.artist_id === artist_id;
    //     });

    //     if (!saved_artist) {
    //         // * something went wrong...
    //         return;
    //     }

    //     let endpoint, onResponse, onError, options;

    //     options = {
    //         params: {
    //             artist_id,
    //         },
    //     };

    //     endpoint = GET_ARTIST_DATA;

    //     onResponse = (res) => {
    //         if (res.status === 200 /*&& res.data.success_id*/) {
    //             console.log(res.data);
    //         }
    //     };
    //     onError = (error) => {
    //         console.log(error);
    //     };

    //     axios
    //         .get(endpoint, options)
    //         .then(onResponse)
    //         .catch(onError);
    // };

    render() {
        const artistList = this.state.processed_artists.map((artist) => {
            return (
                <li
                    key={artist.artist_id}
                    className={
                        "column" +
                        (this.props.layout_classname
                            ? " ".concat(this.props.layout_classname)
                            : "")
                    }
                >
                    <Artist
                        artist={artist}
                        // on_header_action={this.onViewDetailHandler}
                        on_action={this.onSaveHandler}
                    />
                </li>
            );
        });

        const modal = this.state.display_blocked_modal ? (
            <Modal
                onclose={() => {
                    this.setState({ display_blocked_modal: false });
                }}
            >
                <div>
                    <p>That action is currently locked</p>
                </div>
            </Modal>
        ) : null;

        return (
            <ul className="columns is-mobile is-multiline is-marginless">
                {modal}
                {artistList}
            </ul>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreArtist: (artist_to_add) =>
            dispatch(
                actionCreators.add_artist(artist_to_add)
            ),
        onRemoveArtist: (artist_to_remove) =>
            dispatch(
                actionCreators.remove_artist(artist_to_remove)
            ),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_artist_ids: state.artists.saved_artist_ids,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
