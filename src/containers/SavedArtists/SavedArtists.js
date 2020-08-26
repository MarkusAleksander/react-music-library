import React, { Component } from "react";

import { connect } from "react-redux";

import Auxillary from "./../../hoc/Auxillary";

// import SearchForm from "../../components/SearchForm/SearchForm";

import ArtistList from "./../../components/ArtistList/ArtistList";
// import Artist from "../../components/Artist/Artist";

import axios from "./../../netlify_api";

import { GET_ARTIST_DATA } from "./../../api_endpoints";

class SavedArtists extends Component {
    state = {
        artist_data: [],
    };

    onArtistDataResponse = (artist_data) => {
        this.setState({
            artist_data,
        });
    };

    getArtistData = () => {
        if (!this.props.saved_artists.length);

        let artist_ids = this.props.saved_artists.map(
            (artist) => artist.artist_id
        );

        axios
            .get(GET_ARTIST_DATA, {
                params: {
                    artist_ids: artist_ids,
                },
            })
            .then((res) => {
                this.onArtistDataResponse(res.data.artists);
            })
            .catch((err) => console.log(err));
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[SavedArtists:componentDidUpdate]");
        if (prevProps.saved_artists !== this.props.saved_artists) {
            console.log("[SavedArtists:componentDidUpdate:props don't match]");
            // * get artist data from spotify
            this.getArtistData();
        } else {
            console.log("[SavedArtists:componentDidUpdate:props match]");
        }
    }

    render() {
        let filtered_artists = this.state.artist_data;

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

const mapStateToProps = (state) => {
    return {
        saved_artists: state.artists.artists,
    };
};

export default connect(mapStateToProps)(SavedArtists);
