import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Album from "./../Album/Album";

import axios from "./../../netlify_api.js";

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processed_albums: [],
            max_display_results: 6,
            is_loading: null,
        };
    }

    componentDidMount() {
        console.log("[AlbumList:componentDidMount]");
    }

    componentDidUpdate(prevProps) {
        console.log("[AlbumList:componentDidUpdate]");
        if (prevProps.album_data !== this.props.album_data) {
            console.log("[AlbumList:componentDidUpdate:props don't match]");
        } else {
            console.log("[AlbumList:componentDidUpdate:props match]");
        }
    }

    onSelectHandler = (id, status) => {
        // * Search to see if album is already saved
        let album = this.props.album_data.find(
            (album) => album.album_id === id
        );

        let endpoint, onResponse;

        if (album.saved_state) {
            // * then we're updating
            endpoint = "/update-album";
            onResponse = (res) => {
                console.log(res);
            };
        } else {
            endpoint = "/save-album";
            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    this.setState({
                        is_loading: null,
                    });
                    this.props.onStoreAlbum({
                        gfb_id: res.data.success_id,
                        album_id: id,
                        status: status,
                    });
                }
            };
        }

        this.setState({
            is_loading: { id: id, status, status },
        });

        axios
            .post(endpoint, {
                album_id: id,
                status: status,
            })
            .then(onResponse)
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const albumList = this.props.album_data.map((album) => {
            const header_actions = [
                {
                    onClick:
                        album.saved_state === "want"
                            ? null
                            : () =>
                                  this.onSelectHandler(album.album_id, "want"),
                    content: <span className="icon">Want</span>,
                    status:
                        this.state.is_loading &&
                        this.state.is_loading.id === album.album_id &&
                        this.state.is_loading.status === "want"
                            ? "is-loading"
                            : "",
                    className:
                        album.saved_state === "want" ? "is-primary" : "is-info",
                },
                {
                    onClick:
                        album.saved_state === "have"
                            ? null
                            : () =>
                                  this.onSelectHandler(album.album_id, "have"),
                    content: <span className="icon">Have</span>,
                    status:
                        this.state.is_loading &&
                        this.state.is_loading.id === album.album_id &&
                        this.state.is_loading.status === "have"
                            ? "is-loading"
                            : "",
                    className:
                        album.saved_state === "have" ? "is-primary" : "is-info",
                },
            ];
            return (
                <li
                    key={album.album_id}
                    className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                >
                    <Album
                        album_title={album.album_title}
                        album_artist={album.album_artist}
                        album_image={album.album_image}
                        album_id={album.album_id}
                        header_actions={header_actions}
                    />
                </li>
            );
        });

        return <ul className="columns is-mobile is-multiline">{albumList}</ul>;
    }
}

// const mapStateToProps = (state) => {
//     return {
//         saved_albums: state.albums.albums,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbum: (album_data) =>
            dispatch({
                type: actionTypes.STORE_ALBUM,
                album_data,
            }),
        onRemoveAlbum: (album_id) =>
            dispatch({
                type: actionTypes.REMOVE_ALBUM,
                album_id,
            }),
    };
};

export default connect(/*mapStateToProps*/ null, mapDispatchToProps)(AlbumList);
