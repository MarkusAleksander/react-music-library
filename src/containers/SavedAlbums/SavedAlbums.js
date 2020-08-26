import React, { Component } from "react";

import { connect } from "react-redux";

import Auxillary from "./../../hoc/Auxillary";

import AlbumList from "./../../components/AlbumList/AlbumList";

import axios from "./../../netlify_api";

import { GET_ALBUM_DATA } from "./../../api_endpoints";

class SavedAlbums extends Component {
    state = {
        album_data: [],
    };

    onAlbumDataResponse = (album_data) => {
        this.setState({
            album_data,
        });
    };

    getAlbumData = () => {
        if (!this.props.saved_albums.length);

        let album_ids = this.props.saved_albums.map((album) => album.album_id);

        axios
            .get(GET_ALBUM_DATA, {
                params: {
                    album_ids,
                },
            })
            .then((res) => {
                this.onAlbumDataResponse(res.data.albums);
            })
            .catch((err) => console.log(err));
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.saved_albums !== this.props.saved_albums) {
            this.getAlbumData();
        } else {
        }
    }

    render() {
        let filtered_albums = this.state.album_data;

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

const mapStateToProps = (state) => {
    return {
        saved_albums: state.albums.albums,
    };
};

export default connect(mapStateToProps)(SavedAlbums);
