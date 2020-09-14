import React, { Component } from "react";

import { connect } from "react-redux";

import Level from "./../../components/UI/Level/Level";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";
import * as actionTypes from "./../../store/actions";

import ArtistList from "./../../components/ArtistList/ArtistList";

import axios from "./../../netlify_api";

import { GET_ARTIST } from "./../../api_endpoints";

class SavedArtists extends Component {
    state = {
        artist_data: [],
        ordering: "",
        filter_text: "",
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
        // ;
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
                .get(GET_ARTIST, {
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

    onChangeOrdering = (ordering) => {
        if (ordering === "AZ" || ordering === "ZA") {
            this.setState({ ordering });
        }
    };

    sortByAZ = (a, b) => {
        let name_a = a.name.toLowerCase();
        let name_b = b.name.toLowerCase();

        if (name_a < name_b) {
            return -1;
        }
        if (name_a > name_b) {
            return 1;
        }
        return 0;
    };

    sortByZA = (a, b) => {
        let name_a = a.name.toLowerCase();
        let name_b = b.name.toLowerCase();

        if (name_a < name_b) {
            return 1;
        }
        if (name_a > name_b) {
            return -1;
        }
        return 0;
    };

    updateFilterTest = (e) => {
        let filter_text = e.target.value;

        this.setState({
            filter_text,
        });
    };

    render() {
        let filtered_artists = [...this.props.saved_artist_data];

        if (this.state.filter_text !== "") {
            filtered_artists = filtered_artists.filter((artist) =>
                artist.name.toLowerCase().includes(this.state.filter_text)
            );
        }

        if (this.state.ordering === "AZ") {
            filtered_artists.sort(this.sortByAZ);
        }
        if (this.state.ordering === "ZA") {
            filtered_artists.sort(this.sortByZA);
        }

        return (
            <div className="section">
                <Level
                    level_left_content={[
                        <div className="buttons">
                            <Button
                                className={
                                    this.state.ordering === "AZ"
                                        ? "is-primary"
                                        : "is-info"
                                }
                                content="A-Z"
                                onClick={() => this.onChangeOrdering("AZ")}
                            />
                            <Button
                                className={
                                    this.state.ordering === "ZA"
                                        ? "is-primary"
                                        : "is-info"
                                }
                                content="Z-A"
                                onClick={() => this.onChangeOrdering("ZA")}
                            />
                        </div>,
                        <Input
                            onchange={this.updateFilterTest}
                            value={this.state.filter_text}
                        />,
                    ]}
                    level_right_content={[
                        <div className="has-text-centered">
                            <p className="heading">Num Artists</p>
                            <p className="title">{filtered_artists.length}</p>
                        </div>,
                    ]}
                />
                {filtered_artists.length ? (
                    <ArtistList layout_classname={"is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"} artists={filtered_artists} />
                ) : (
                        <p>Loading...</p>
                    )}
            </div>
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
