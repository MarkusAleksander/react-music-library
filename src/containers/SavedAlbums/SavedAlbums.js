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

    constructor(props) {
        super(props);

        this.state = {
            ordering: "",
            filter_text: "",
            filter_status: "",
            // TODO - this is going to depend on number of current items
            next_page: 0,
            is_loading: false,
            observer_is_active: false
        };

        this.observer = new IntersectionObserver(this.onObserve);

        this.lazy_loader_ref = React.createRef();
    }

    componentDidMount() {
        // * component is mounted - prepare the lazy loader observer for scroll api requests
        this.setUpLazyLoaderObserver();
        // * is there already album data in the store?
        if (this.props.saved_album_data_total) {
            // * if so, what "page" are we up to?
            this.setState({
                next_page: this.props.saved_album_data.length
            });
        } else {
            // * if not...
            // this.requestAlbumData();
        }

        this.handleObserver();
    }

    componentDidUpdate(prevProps, prevState) {
        // * do we need to request data?

        // * if we've just finished loading, don't do anything
        if (prevState.is_loading && !this.state.is_loading) {
            return;
        }
        this.handleShouldRequestAlbumData();
        this.handleObserver();
    }

    handleObserver = () => {
        if (this.props.saved_album_ids_total && this.props.saved_album_ids_total === this.props.saved_album_data_total) {
            this.disconnectLazyLoaderObserver();
        } else {
            this.setUpLazyLoaderObserver();
        }
    }

    onObserve = (entries) => {
        entries.forEach((entry) => {
            const { isIntersecting } = entry;

            if (isIntersecting) {
                console.log("loading more albums...");
                this.handleShouldRequestAlbumData();
            }
        });
    }

    setUpLazyLoaderObserver = () => {
        if (this.state.observer_is_active) return;

        console.log("[SavedAlbums:setUpLazyLoaderObserver]");

        this.observer.observe(this.lazy_loader_ref.current);
        this.setState({
            observer_is_active: true
        });
    }

    disconnectLazyLoaderObserver = () => {
        if (!this.state.observer_is_active) return;

        console.log("[SavedAlbums:disconnectLazyLoaderObserver]");

        this.observer.disconnect();
        this.setState({
            observer_is_active: false
        });
    }

    handleShouldRequestAlbumData = () => {
        // * only get album data when
        if (
            // * we have albums ids...
            this.props.saved_album_ids_total
            // * we haven't yet got all the album data
            && this.props.saved_album_ids_total !== this.props.saved_album_data_total
            // * and we're not currently loading data already
            && !this.state.is_loading
        ) {
            this.requestAlbumData();
        }
    }

    requestAlbumData = () => {
        // * request the data from the api...
        let requested_ids = [];
        if (
            // * album id totals and album data totals don't match
            this.props.saved_album_ids_total !== this.props.saved_album_data_total
            // * and the number of album id chunks and album data chunks do match
            // TODO - required?
            && this.props.saved_album_ids.length === this.props.saved_album_data.length
        ) {
            // * find all new ids (have to account for items shifting around by removal etc)
            let ids = this.props.saved_album_ids.flat().map(id => id.album_id);
            let datas = this.props.saved_album_data.flat().map(data => data.id);

            requested_ids = ids.filter((id) => {
                // * return id where id is not in the data_chunk
                return !datas.includes(id);
            });

        } else {
            // * otherwise, we're just getting the next chunk
            requested_ids = this.props.saved_album_ids[this.state.next_page].map(
                (album) => album.album_id
            )
        }

        // max 20 at any time
        if (requested_ids.length > 20) {
            requested_ids = requested_ids.slice(0, 19);
        }

        axios
            .get(GET_ALBUM_DATA, {
                params: {
                    album_ids: requested_ids,
                },
            })
            .then((res) => {
                // * store the returned results
                this.props.onStoreAlbumData(res.data.albums);
                // * signify we're no longer loading, and we're ready to get the next page
                this.setState({
                    is_loading: false,
                    next_page: this.state.next_page + 1
                });
            })
            .catch((err) => console.log(err));

        // * signify we're loading
        this.setState({
            is_loading: true,
        });
    };

    onChangeOrdering = (ordering) => {
        if (ordering === "AZ" || ordering === "ZA") {
            if (ordering === this.state.ordering) ordering = "";
            this.setState({ ordering });
        }
    };

    onChangeFilterState = (filter_status) => {
        if (filter_status === "have" || filter_status === "want") {
            if (filter_status === this.state.filter_status) filter_status = "";
            this.setState({ filter_status })
        }
    }

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

    updateFilterText = (e) => {
        let filter_text = e.target.value;

        this.setState({
            filter_text,
        });
    };

    render() {
        let filtered_albums = this.props.saved_album_data.flat();
        if (this.state.filter_text !== "") {
            filtered_albums = filtered_albums.filter((album) => {
                // * search if in album title or album artist contains matching string
                return (
                    album.name.toLowerCase().includes(this.state.filter_text) ||
                    album.artists.some((artist) => {
                        return (
                            artist.name
                                .toLowerCase()
                                .indexOf(this.state.filter_text) > -1
                        );
                    })
                );
            });
        }

        if (this.state.ordering === "AZ") {
            filtered_albums.sort(this.sortByAZ);
        }
        if (this.state.ordering === "ZA") {
            filtered_albums.sort(this.sortByZA);
        }

        if (this.state.filter_status !== "") {
            let filtered_ids = this.props.saved_album_ids.flat().filter(album => album.status === this.state.filter_status);
            filtered_albums = filtered_albums.filter((album) => {
                return (
                    filtered_ids.find(a => a.album_id === album.id)
                )
            });
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
                            <Button
                                className={
                                    this.state.filter_status === "have"
                                        ? "is-primary"
                                        : "is-info"
                                }
                                content="Have"
                                onClick={() => this.onChangeFilterState("have")}
                            />
                            <Button
                                className={
                                    this.state.filter_status === "want"
                                        ? "is-primary"
                                        : "is-info"
                                }
                                content="Want"
                                onClick={() => this.onChangeFilterState("want")}
                            />
                        </div>,
                        <Input
                            onchange={this.updateFilterText}
                            value={this.state.filter_text}
                        />,
                    ]}
                    level_right_content={[
                        <div className="has-text-centered">
                            <p className="heading">Num Albums</p>
                            <p className="title">{this.props.saved_album_ids_total}</p>
                        </div>,
                    ]}
                />
                {filtered_albums.length ? (
                    <AlbumList layout_classname={"is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"} albums={filtered_albums} />
                ) : null}
                {/* {this.props.saved_album_ids_total !== this.props.saved_album_data_total ? ( */}
                <div className="lazy-loader" ref={this.lazy_loader_ref}>
                    {this.state.is_loading ? <div className="section"><p className="has-text-centered">Loading more...</p></div> : null}
                </div>
                {/* ) : null} */}
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
        saved_album_ids_total: state.albums.saved_album_ids_total,
        saved_album_data_total: state.albums.saved_album_data_total
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
