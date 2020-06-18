import React, { Component } from "react";

import Auxillary from "./../../hoc/Auxillary";

import SearchForm from "../../components/SearchForm/SearchForm";

import AlbumList from "./../../components/AlbumList/AlbumList";
import ArtistList from "./../../components/ArtistList/ArtistList";

class Albums extends Component {
    state = {
        search_result: null,
    };

    handleSearchResponse = (data) => {
        this.setState({
            search_result: data,
        });
    };

    process_search_result_data = () => {
        if (this.state.search_result.result_type === "album") {
            return <AlbumList album_data={this.state.search_result} />;
        } else if (this.state.search_result.result_type === "artist") {
            return <ArtistList artist_data={this.state.search_result} />;
        }
    };

    render() {
        const search_results = this.state.search_result
            ? this.process_search_result_data()
            : null;

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

export default Albums;
