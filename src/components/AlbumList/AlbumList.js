import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "./../../store/actions";

import Album from "./../Album/Album";

import axios from "./../../netlify_api.js";

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            max_display_results: 6,
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

    // onSelectHandler = (id, status) => {
    //     // * Search to see if album is already saved
    //     let album = this.props.album_data.find(
    //         (album) => album.album_id === id
    //     );

    //     let endpoint, onResponse;

    //     if (album.saved_state) {
    //         // * then we're updating
    //         endpoint = "/update-album";
    //         onResponse = (res) => {
    //             console.log(res);
    //         };
    //     } else {
    //         endpoint = "/save-album";
    //         onResponse = (res) => {
    //             if (res.status === 200 && res.data.success_id) {
    //                 this.props.onStoreAlbum({
    //                     gfb_id: res.data.success_id,
    //                     album_id: id,
    //                     status: status,
    //                 });
    //             }
    //         };
    //     }

    //     axios
    //         .post(endpoint, {
    //             album_id: id,
    //             status: status,
    //         })
    //         .then(onResponse)
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    onActionSelect = (album_id, action_selected) => {
        // * Search to see if album is already saved
        let album = this.props.album_data.find(
            (album) => album.album_id === album_id
        );

        let endpoint, onResponse;

        if (album && album.have_status === "" && album.want_status === "") {
            // * then we're updating
            endpoint = "/update-album";
            onResponse = (res) => {
                console.log(res);
            };
        } else {
            endpoint = "/save-album";
            onResponse = (res) => {
                if (res.status === 200 && res.data.success_id) {
                    this.props.onStoreAlbum({
                        gfb_id: res.data.success_id,
                        album_id: id,
                        status: action_selected,
                    });
                }
            };
        }

        if (action_selected === "want") {
            album.want_status = "loading";
        } else if (action_selected === "have") {
            album.have_status = "loading";
        }

        axios
            .post(endpoint, {
                album_id: id,
                status: action_selected,
            })
            .then(onResponse)
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const albumList = this.props.album_data.map((album) => {
            return (
                <li
                    key={album.album_id}
                    className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                >
                    <Album
                        album_data={album}
                        // album_title={album.album_title}
                        // album_artist={album.album_artist}
                        // album_image={album.album_image}
                        // album_id={album.album_id}
                        on_action={this.onActionSelect}
                        // actions={actions}
                    />
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
        onRemoveAlbum: (album_id) =>
            dispatch({
                type: actionTypes.REMOVE_ALBUM,
                album_id,
            }),
    };
};

export default connect(/*mapStateToProps*/ null, mapDispatchToProps)(AlbumList);
