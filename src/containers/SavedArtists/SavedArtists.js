import React, { Component } from "react";

import { connect } from "react-redux";

import Auxillary from "./../../hoc/Auxillary";
import * as actionTypes from "./../../store/actions";

import ArtistList from "./../../components/ArtistList/ArtistList";

import axios from "./../../netlify_api";

import { GET_ARTIST_DATA } from "./../../api_endpoints";

class SavedArtists extends Component {
    state = {
        artist_data: [],
    };

    componentDidMount() {
        console.log("[SavedArtists:componentDidMount]");
        this.requestArtistData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("[SavedArtists:componentDidUpdate]");
        if (
            prevProps.saved_artist_ids !== this.props.saved_artist_ids ||
            this.props.saved_artist_ids.length !==
                this.props.saved_artist_data.length
        ) {
            console.log("[SavedArtists:componentDidUpdate:props don't match]");
            this.requestArtistData();
        } else {
            console.log("[SavedArtists:componentDidUpdate:props match]");
        }
    }

    requestArtistData = () => {
        // debugger;
        console.log("[SavedArtists:requestArtistData]");
        // * get artist data from spotify
        // * if we have saved_artist_ids and we have artist_ids length != artist_data, request data
        if (
            this.props.saved_artist_ids.length &&
            this.props.saved_artist_ids.length !==
                this.props.saved_artist_data.length
        ) {
            // * get artist data
            axios
                .get(GET_ARTIST_DATA, {
                    params: {
                        artist_ids: this.props.saved_artist_ids.map(
                            (artist) => artist.artist_id
                        ),
                    },
                })
                .then((res) => {
                    this.props.onStoreArtistData(res.data.artists);
                })
                .catch((err) => console.log(err));
        }
    };

    render() {
        // debugger;
        let filtered_artists = this.props.saved_artist_data;

        if (filtered_artists.length) {
            // debugger;
        }

        return (
            <Auxillary>
                <div className="section">
                    {filtered_artists.length ? (
                        <ArtistList artists={filtered_artists} />
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
        onStoreArtistData: (saved_artist_data) =>
            dispatch({
                type: actionTypes.STORE_SAVED_ARTIST_DATA,
                saved_artist_data,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_artist_ids: state.artists.saved_artist_ids,
        saved_artist_data: state.artists.saved_artist_data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedArtists);
