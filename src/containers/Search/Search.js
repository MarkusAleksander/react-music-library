import React, { Component } from "react";

import { connect } from "react-redux";
// import * as actionTypes from "./../../store/actions.js";

import Auxillary from "./../../hoc/Auxillary";

import SearchForm from "../../components/SearchForm/SearchForm";

import AlbumList from "./../../components/AlbumList/AlbumList";
import ArtistList from "./../../components/ArtistList/ArtistList";

class Search extends Component {
    state = {
        search_result: null,
        max_display_results: 8,
        processed_album_data: [],
        processed_artist_data: [],
    };

    handleSearchResponse = (data) => {
        this.setState({
            search_result: data,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[Search:componentDidUpdate]");
        if (prevProps.saved_albums !== this.props.saved_albums) {
            console.log("[Search:componentDidUpdate:props don't match]");
        } else {
            console.log("[Search:componentDidUpdate:props match]");
        }
    }

    render() {
        let search_results = null;
        if (
            this.state.search_result &&
            this.state.search_result.result_type === "album"
        ) {
            search_results = (
                <AlbumList albums={this.state.search_result.albums} />
            );
        } else if (
            this.state.search_result &&
            this.state.search_result.result_type === "artist"
        ) {
            search_results = (
                <ArtistList artists={this.state.search_result.artists} />
            );
        }

        return (
            <Auxillary>
                <div className="section">
                    <SearchForm onsearchresponse={this.handleSearchResponse} />
                </div>
                <div className="section">{search_results}</div>
            </Auxillary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        saved_albums: state.albums.albums,
        saved_artists: state.artists.artists,
    };
};

export default connect(mapStateToProps)(Search);
