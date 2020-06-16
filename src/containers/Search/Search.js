import React, { Component } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";

import AlbumList from "./../../components/AlbumList/AlbumList";
import ArtistList from "./../../components/ArtistList/ArtistList";

class Albums extends Component {
    state = {
        search_result: null,
        max_display_results: 6,
    };

    handleSearchResponse = (data) => {
        this.setState({
            search_result: data,
        });
    };

    process_album_data() {
        const album_results = this.state.search_result.albums.items;

        const mapped_album_results = album_results
            .slice(0, this.state.max_display_results)
            .map((album) => {
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
                };
            });

        return <AlbumList albums={mapped_album_results} />;
    }

    process_artist_data() {
        const artist_results = this.state.search_result.artists.items;

        const mapped_artist_results = artist_results
            .slice(0, this.state.max_display_results)
            .map((artist) => {
                return {
                    artist_title: artist.name,
                    artist_id: artist.id,
                    artist_image:
                        artist.images[0] && artist.images[0].url
                            ? artist.images[0].url
                            : null,
                };
            });

        return <ArtistList artists={mapped_artist_results} />;
    }

    process_search_result_data = () => {
        if (this.state.search_result.result_type === "album") {
            return this.process_album_data();
        } else if (this.state.search_result.result_type === "artist") {
            return this.process_artist_data();
        }
    };

    render() {
        const search_results = this.state.search_result
            ? this.process_search_result_data()
            : null;

        return (
            <div className="section">
                <div className="container">
                    <SearchForm onsearchresult={this.handleSearchRsesult} />
                </div>
                <div className="container">{search_results}</div>
            </div>
        );
    }
}

export default Albums;
