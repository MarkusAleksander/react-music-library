import React, { Component } from "react";

import { connect } from "react-redux";

import Auxillary from "./../../hoc/Auxillary";
import * as actionTypes from "./../../store/actions";

import AlbumList from "./../../components/AlbumList/AlbumList";

import axios from "./../../netlify_api";

import { GET_ALBUM_DATA } from "./../../api_endpoints";

class SavedAlbums extends Component {
    state = {
        album_data: [],
    };

    componentDidMount() {
        console.log("[SavedAlbums:componentDidMount]");
        this.requestAlbumData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("[SavedAlbums:componentDidUpdate]");
        if (
            prevProps.saved_album_ids !== this.props.saved_album_ids ||
            this.props.saved_album_ids.length !==
                this.props.saved_album_data.length
        ) {
            console.log("[SavedAlbums:componentDidUpdate:props don't match]");
            this.requestAlbumData();
        } else {
            console.log("[SavedAlbums:componentDidUpdate:props match]");
        }
    }

    requestAlbumData = () => {
        // debugger;
        console.log("[SavedAlbums:requestAlbumData]");
        // * get album data from spotify
        // * if we have saved_album_ids and we have album_ids length != album_data, request data
        if (
            this.props.saved_album_ids.length &&
            this.props.saved_album_ids.length !==
                this.props.saved_album_data.length
        ) {
            // * get album data
            axios
                .get(GET_ALBUM_DATA, {
                    params: {
                        album_ids: this.props.saved_album_ids.map(
                            (album) => album.album_id
                        ),
                    },
                })
                .then((res) => {
                    this.props.onStoreAlbumData(res.data.albums);
                })
                .catch((err) => console.log(err));
        }
    };

    render() {
        let filtered_albums = this.props.saved_album_data;

        if (filtered_albums.length) {
        }

        return (
            <Auxillary>
                <div className="section">
                    {filtered_albums.length ? (
                        <AlbumList albums={filtered_albums} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </Auxillary>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbumData: (saved_album_data) =>
            dispatch({
                type: actionTypes.STORE_SAVED_ALBUM_DATA,
                saved_album_data,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_album_ids: state.albums.saved_album_ids,
        saved_album_data: state.albums.saved_album_data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
