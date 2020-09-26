import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Album from "./../Album/Album";

import axios from "./../../netlify_api.js";

import { SAVE_ALBUM, DELETE_ALBUM, UPDATE_ALBUM } from "./../../api_endpoints";
import Modal from "../UI/Modal/Modal";

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 0,
            processed_albums: [],
            display_blocked_modal: false,
        };
    }

    componentDidMount() {
        console.log("[AlbumList:componentDidMount]");
        this.processAlbumData();
    }

    componentDidUpdate(prevProps) {
        console.log("[AlbumList:componentDidUpdate]");
        if (
            prevProps.albums !== this.props.albums ||
            prevProps.saved_album_ids !== this.props.saved_album_ids
        ) {
            console.log("[AlbumList:componentDidUpdate:props don't match]");
            this.processAlbumData();
        } else {
            console.log("[AlbumList:componentDidUpdate:props match]");
        }
    }

    processAlbumData = () => {
        let saved_album_ids = this.props.saved_album_ids
            .flat()
            .map((album) => album.album_id);

        // TODO just albums, not singles / compilations
        let filtered_albums = this.props.albums.filter((album) => {
            return (
                (album.album_type === "album" &&
                    album.album_group === "album") ||
                album.type === "album"
            );
        });

        let processed_albums = filtered_albums
            .slice(
                0,
                this.state.max_display_results
                    ? this.state.max_display_results
                    : this.props.albums.length
            )
            .map((album) => {
                let status = saved_album_ids.includes(album.id)
                    ? this.props.saved_album_ids
                          .flat()
                          .find(
                              (saved_album) => saved_album.album_id === album.id
                          ).status
                    : null;

                return {
                    album_title: album.name,
                    album_id: album.id,
                    album_image:
                        album.images[0] && album.images[0].url
                            ? album.images[0].url
                            : null,
                    album_artist:
                        album.artists[0] && album.artists[0].name
                            ? album.artists[0].name
                            : null,
                    album_artist_id:
                        album.artists[0] && album.artists[0].id
                            ? album.artists[0].id
                            : null,
                    status: status,
                    release_date: album.release_date,
                    album_type: album.album_type,
                };
            });
        this.setState({
            processed_albums: processed_albums,
        });
    };

    onSaveHandler = (album_id, status) => {
        if (window.location.host.indexOf("localhost") < 0) {
            this.setState({
                display_blocked_modal: true,
            });
            return;
        }

        let saved_album = this.props.saved_album_ids
            .flat()
            .find((album) => album.album_id === album_id);

        let endpoint, onResponse, onError, options, prevState;
        // debugger;
        // * f we have the album and the status is the same, we're removing it
        if (saved_album && saved_album.status === status) {
            endpoint = DELETE_ALBUM;

            options = {
                album_id: album_id,
                gfb_id: saved_album.gfb_id,
            };

            // * set album to loading
            prevState = saved_album.status;
            // TODO - needed when doing the same further down?
            saved_album.status = "loading";

            let albums = [...this.state.processed_albums];
            let album = albums.find((album) => album.album_id === album_id);

            album.status = "loading";

            this.setState({
                processed_albums: albums,
            });

            // * send resquest
            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    saved_album.status = res.data.status;
                    this.props.onRemoveAlbum({
                        gfb_id: res.data.success_id,
                        album_id: album_id,
                    });
                }
            };

            // * if on error, reset state
            onError = (err) => {
                let albums = [...this.state.processed_albums];
                let album = albums.find((album) => album.album_id === album_id);

                album.status = prevState;

                this.setState({
                    processed_albums: albums,
                });
            };
        }
        // * If we have album, then we're updating and the status is different, it's an update
        else if (saved_album && saved_album.status !== null) {
            endpoint = UPDATE_ALBUM;

            options = {
                album_id: album_id,
                gfb_id: saved_album.gfb_id,
                status: status,
            };

            // * set album to loading
            prevState = saved_album.status;
            saved_album.status = "loading";

            let albums = [...this.state.processed_albums];
            let album = albums.find((album) => album.album_id === album_id);

            album.status = "loading";

            this.setState({
                processed_albums: albums,
            });

            // * send resquest
            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    saved_album.status = res.data.status;
                    this.props.onUpdateAlbum({
                        gfb_id: res.data.success_id,
                        album_id: album_id,
                        album: saved_album,
                    });
                }
            };

            // * if on error, reset state
            onError = (err) => {
                let albums = [...this.state.processed_albums];
                let album = albums.find((album) => album.album_id === album_id);

                album.status = prevState;

                this.setState({
                    processed_albums: albums,
                });
            };
        } else {
            // * we're saving a new album
            endpoint = SAVE_ALBUM;

            options = {
                album_id: album_id,
                status: status,
            };

            let albums = [...this.state.processed_albums];
            let album = albums.find((album) => album.album_id === album_id);

            album.status = "loading";

            this.setState({
                processed_albums: albums,
            });

            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    this.props.onStoreAlbum({
                        gfb_id: res.data.success_id,
                        album_id: album_id,
                        status: status,
                    });
                }
            };

            // * if on error, reset state
            onError = (err) => {
                let albums = [...this.state.processed_albums];
                let album = albums.find((album) => album.album_id === album_id);

                album.status = prevState;

                this.setState({
                    processed_albums: albums,
                });
            };
        }

        axios
            .post(endpoint, options)
            .then(onResponse)
            .catch(onError);
    };

    render() {
        const albumList = this.state.processed_albums.map((album) => {
            return (
                <li
                    key={album.album_id}
                    className={
                        "column" +
                        (this.props.layout_classname
                            ? " ".concat(this.props.layout_classname)
                            : "")
                    }
                >
                    <Album album={album} on_action={this.onSaveHandler} />
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
                {albumList}
            </ul>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbum: (album_to_add) =>
            dispatch({
                type: actionTypes.ADD_ALBUM,
                album_to_add,
            }),
        onRemoveAlbum: (album_to_remove) =>
            dispatch({
                type: actionTypes.REMOVE_ALBUM,
                album_to_remove,
            }),
        onUpdateAlbum: (album_to_update) =>
            dispatch({
                type: actionTypes.UPDATE_ALBUM,
                album_to_update,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_album_ids: state.albums.saved_album_ids,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
