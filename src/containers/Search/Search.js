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
        this.setState(
            {
                search_result: data,
            }
            // this.processSearchResultData
        );
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("[Search:componentDidUpdate]");
        if (prevProps.saved_albums !== this.props.saved_albums) {
            console.log("[Search:componentDidUpdate:props don't match]");
            // this.processSearchResultData();
        } else {
            console.log("[Search:componentDidUpdate:props match]");
        }
    }

    processAlbumData = () => {
        // * get list of saved ids
        let saved_album_ids = [];
        this.props.saved_albums.forEach((album) => {
            saved_album_ids.push(album.album_id);
        });
        let processed_album_data = this.state.search_result.albums.items
            .slice(0, this.state.max_display_results)
            .map((album) => {
                let is_saved = saved_album_ids.includes(album.id);
                let status = is_saved
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
            processed_album_data: processed_album_data,
        });
    };

    processArtistData = () => {
        let saved_artist_ids = [];
        this.props.saved_artists.forEach((artist) => {
            saved_artist_ids.push(artist.artist_id);
        });

        let processed_artist_data = this.state.search_result.artists.items
            .slice(0, this.state.max_display_results)
            .map((artist) => {
                let is_saved = saved_artist_ids.includes(artist.id);

                return {
                    artist_title: artist.name,
                    artist_id: artist.id,
                    artist_image:
                        artist.images[0] && artist.images[0].url
                            ? artist.images[0].url
                            : null,
                    is_saved,
                };
            });

        this.setState({
            processed_artist_data: processed_artist_data,
        });
    };

    processSearchResultData = () => {
        if (
            this.state.search_result &&
            this.state.search_result.result_type === "album"
        ) {
            return this.processAlbumData();
        } else if (
            this.state.search_result &&
            this.state.search_result.result_type === "artist"
        ) {
            return this.processArtistData();
        }
    };

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
                <ArtistList artist_data={this.state.processed_artist_data} />
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
