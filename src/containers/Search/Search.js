import React, { Component } from "react";

import { connect } from "react-redux";
// import * as actionTypes from "./../../store/actions.js";

import Auxillary from "./../../hoc/Auxillary";
import * as actionTypes from "./../../store/actions";

import SearchForm from "../../components/SearchForm/SearchForm";

import AlbumList from "./../../components/AlbumList/AlbumList";
import ArtistList from "./../../components/ArtistList/ArtistList";

class Search extends Component {
    state = {
        result_type: "",
    };

    handleSearchResponse = (data) => {
        console.log("[Search:handleSearchResponse]");
        let result_type = data.result_type;

        this.setState({
            result_type,
        });

        if (result_type === "album") {
            this.props.onStoreAlbumQueryResults(data.albums.items);
        } else if (result_type === "artist") {
            this.props.onStoreArtistQueryResults(data.artists.items);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[Search:componentDidUpdate]");
        if (
            prevProps.queried_artist_data !== this.props.queried_artist_data ||
            prevProps.queried_album_data !== this.props.queried_album_data
        ) {
            console.log("[Search:componentDidUpdate:props don't match]");
        } else {
            console.log("[Search:componentDidUpdate:props match]");
        }
    }

    render() {
        let search_results = null;
        if (this.state.result_type === "album") {
            search_results = (
                <AlbumList albums={this.props.queried_album_data} />
            );
        } else if (this.state.result_type === "artist") {
            search_results = (
                <ArtistList artists={this.props.queried_artist_data} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreArtistQueryResults: (queried_artist_data) => {
            dispatch({
                type: actionTypes.STORE_ARTIST_QUERY_RESULTS,
                queried_artist_data: queried_artist_data,
            });
        },
        onStoreAlbumQueryResults: (queried_album_data) => {
            dispatch({
                type: actionTypes.STORE_ALBUM_QUERY_RESULTS,
                queried_album_data: queried_album_data,
            });
        },
    };
};

const mapStateToProps = (state) => {
    return {
        queried_album_data: state.albums.queried_album_data,
        queried_artist_data: state.artists.queried_artist_data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
