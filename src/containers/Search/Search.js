import React, { Component } from "react";

import SearchForm from "../../components/SearchForm/SearchForm";

import AlbumList from "./../../components/AlbumList/AlbumList";
import ArtistList from "./../../components/ArtistList/ArtistList";

class Albums extends Component {
    state = {
        search_result: null,
    };

    handleSearchResult = (data) => {
        this.setState({
            search_result: data,
        });
    };

    process_album_data() {
        let album_data = this.state.search_result.albums;

        let album_results = album_data.items;

        let mapped_album_results = album_results.map((album) => {
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
        let artist_data = this.state.search_result.artists;

        let artist_results = artist_data.items;

        let mapped_artist_results = artist_results.map((artist) => {
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

    process_data = () => {
        if (this.state.search_result.result_type === "album") {
            return this.process_album_data();
        } else if (this.state.search_result.result_type === "artist") {
            return this.process_artist_data();
        }
    };

    render() {
        return (
            <div className="albums">
                <SearchForm onsearchresult={this.handleSearchResult} />
                {this.state.search_result ? (
                    <div>{this.process_data()}</div>
                ) : null}
            </div>
        );
    }
}

export default Albums;
