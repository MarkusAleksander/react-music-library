import React, { Component } from "react";

// import AlbumList from "./../../components/AlbumList/AlbumList";
import SearchForm from "../../components/SearchForm/SearchForm";

class Albums extends Component {
    state = {
        search_result: null,
    };

    handleSearchResult = (data) => {
        this.setState({
            search_result: data,
        });
    };

    process_album_data() {}

    process_artist_data() {
        let artist_data = this.state.search_result.artists;

        let artist_results = artist_data.items;

        let mapped_artist_results = artist_results.map((artist) => {
            return (
                <div className="artist-result" key={artist.id}>
                    <p>{artist.name}</p>
                    <p>{artist.id}</p>
                    {artist.images[0] && artist.images[0].url ? (
                        <img alt="" src={artist.images[0].url} />
                    ) : null}
                </div>
            );
        });

        return mapped_artist_results;
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
