import React, { Component } from "react";

import { connect } from "react-redux";

import Level from "./../../components/UI/Level/Level";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";
import * as actionTypes from "./../../store/actions";

import AlbumList from "./../../components/AlbumList/AlbumList";

import axios from "./../../netlify_api";

import { GET_ALBUM_DATA } from "./../../api_endpoints";

class SavedAlbums extends Component {
    state = {
        album_data: [],
        ordering: "",
        filter_text: "",
    };

    componentDidMount() {
        console.log("[SavedAlbums:componentDidMount]");
        this.requestAlbumData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("[SavedAlbums:componentDidUpdate]");
        if (
            prevProps.saved_album_ids !== this.props.saved_album_ids ||
            this.props.saved_album_ids.length !==
                this.props.saved_album_data.length
        ) {
            console.log("[SavedAlbums:componentDidUpdate:props don't match]");
            this.requestAlbumData();
        } else {
            console.log("[SavedAlbums:componentDidUpdate:props match]");
        }
    }

    requestAlbumData = () => {
        // ;
        console.log("[SavedAlbums:requestAlbumData]");
        // * get album data from spotify
        // * if we have saved_album_ids and we have album_ids length != album_data, request data
        if (
            this.props.saved_album_ids.length &&
            this.props.saved_album_ids.length !==
                this.props.saved_album_data.length
        ) {
            // * get album data
            axios
                .get(GET_ALBUM_DATA, {
                    params: {
                        album_ids: this.props.saved_album_ids.map(
                            (album) => album.album_id
                        ),
                    },
                })
                .then((res) => {
                    this.props.onStoreAlbumData(res.data.albums);
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
        let filtered_albums = [...this.props.saved_album_data];

        if (this.state.filter_text !== "") {
            filtered_albums = filtered_albums.filter((album) =>
                album.name.toLowerCase().includes(this.state.filter_text)
            );
        }

        if (this.state.ordering === "AZ") {
            filtered_albums.sort(this.sortByAZ);
        }
        if (this.state.ordering === "ZA") {
            filtered_albums.sort(this.sortByZA);
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
                            <p className="heading">Num Albums</p>
                            <p className="title">{filtered_albums.length}</p>
                        </div>,
                    ]}
                />
                {filtered_albums.length ? (
                    <AlbumList albums={filtered_albums} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStoreAlbumData: (saved_album_data) =>
            dispatch({
                type: actionTypes.STORE_SAVED_ALBUM_DATA,
                saved_album_data,
            }),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_album_ids: state.albums.saved_album_ids,
        saved_album_data: state.albums.saved_album_data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
