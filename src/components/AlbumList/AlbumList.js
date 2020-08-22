import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Album from "./../Album/Album";

import axios from "./../../netlify_api.js";

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 8,
            processed_albums: [],
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
            prevProps.saved_albums !== this.props.saved_albums
        ) {
            console.log("[AlbumList:componentDidUpdate:props don't match]");
            this.processAlbumData();
        } else {
            console.log("[AlbumList:componentDidUpdate:props match]");
        }
    }

    processAlbumData = () => {
        let saved_album_ids = [];
        this.props.saved_albums.forEach((album) => {
            saved_album_ids.push(album.album_id);
        });
        let processed_albums = this.props.albums.items
            .slice(0, this.state.max_display_results)
            .map((album) => {
                let status = saved_album_ids.includes(album.id)
                    ? this.props.saved_albums.find(
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
                };
            });

        this.setState({
            processed_albums: processed_albums,
        });
    };

    onSaveHandler = (album_id, status) => {
        let saved_album = this.props.saved_albums.find(
            (album) => album.album_id === album_id
        );

        let endpoint, onResponse, onError, options, prevState;
        // debugger;
        // * f we have the album and the status is the same, we're removing it
        if (saved_album && saved_album.status === status) {
            endpoint = "/delete-album";

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
            endpoint = "/update-album";

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
            endpoint = "/save-album";

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
                    className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                >
                    <Album album={album} on_action={this.onSaveHandler} />
                </li>
            );
        });

        return <ul className="columns is-mobile is-multiline">{albumList}</ul>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbum: (album_data) =>
            dispatch({
                type: actionTypes.STORE_ALBUM,
                album_data,
            }),
        onRemoveAlbum: (album_data) =>
            dispatch({
                type: actionTypes.REMOVE_ALBUM,
                album_data,
            }),
        onUpdateAlbum: (album_data) =>
            dispatch({
                type: actionTypes.UPDATE_ALBUM,
                album_data,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_albums: state.albums.albums,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
