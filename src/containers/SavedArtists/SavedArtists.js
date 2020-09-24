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

    constructor(props) {
        super(props);

        this.state = {
            ordering: "",
            filter_text: "",
            next_page: 0,
            is_loading: false,
            observer_is_active: false
        };

        this.observer = new IntersectionObserver(this.onObserve);

        this.lazy_loader_ref = React.createRef();
    }

    componentDidMount() {
        this.setUpLazyLoaderObserver();
        // this.requestArtistData();
        if (this.props.saved_artist_data_total) {
            this.setState({
                next_page: this.props.saved_artist_data.length
            });
        } else {
            // 
        }

        this.handleObserver();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.is_loading && !this.state.is_loading) {
            return;
        }
        this.handleShouldRequestArtistData();
        this.handleObserver();
    }

    handleObserver = () => {
        if (this.props.saved_artist_ids_total && this.props.saved_artist_ids_total === this.props.saved_artist_data_total) {
            this.disconnectLazyLoaderObserver();
        } else {
            this.setUpLazyLoaderObserver();
        }
    }

    onObserve = (entries) => {
        entries.forEach((entry) => {
            const { isIntersecting } = entry;

            if (isIntersecting) {
                console.log("loading more artists...");
                this.handleShouldRequestArtistData();
            }
        });
    }

    setUpLazyLoaderObserver = () => {
        if (this.state.observer_is_active) return;

        console.log("[SavedArtists:setUpLazyLoaderObserver]");

        this.observer.observe(this.lazy_loader_ref.current);
        this.setState({
            observer_is_active: true
        });
    }

    disconnectLazyLoaderObserver = () => {
        if (!this.state.observer_is_active) return;

        console.log("[SavedArtists:disconnectLazyLoaderObserver]");

        this.observer.disconnect();
        this.setState({
            observer_is_active: false
        });
    }

    handleShouldRequestArtistData = () => {
        if (
            this.props.saved_artist_ids_total
            && this.props.saved_artist_ids_total !== this.props.saved_artist_data_total
            && !this.state.is_loading
        ) {
            this.requestArtistData();
        }
    }

    requestArtistData = () => {
        let requested_ids = [];
        if (
            this.props.saved_artist_ids_total !== this.props.saved_artist_data_total
            && this.props.saved_artist_ids.length === this.props.saved_artist_data.length
        ) {
            let ids = this.props.saved_artist_ids.flat().map(id => id.artist_id);
            let datas = this.props.saved_artist_data.flat().map(data => data.id);

            requested_ids = ids.filter((id) => {
                return !datas.includes(id);
            });
        } else {
            requested_ids = this.props.saved_artist_ids[this.state.next_page].map(
                (artist) => artist.artist_id
            )
        }

        // max 20 at any time
        if (requested_ids.length > 20) {
            requested_ids = requested_ids.slice(0, 19);
        }

        // * get artist data
        axios
            .get(GET_ARTIST, {
                params: {
                    artist_ids: requested_ids
                },
            })
            .then((res) => {
                this.props.onStoreArtistData(res.data.artists);
                this.setState({
                    is_loading: false,
                    next_page: this.state.next_page + 1
                })
            })
            .catch((err) => console.log(err));

        this.setState({
            is_loading: true
        });
    };

    onChangeOrdering = (ordering) => {
        if (ordering === "AZ" || ordering === "ZA") {
            if (ordering === this.state.ordering) ordering = "";
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
        let filtered_artists = this.props.saved_artist_data.flat();
        // debugger;
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
                            <p className="title">{this.props.saved_artist_ids_total}</p>
                        </div>,
                    ]}
                />
                {filtered_artists.length ? (
                    <ArtistList layout_classname={"is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"} artists={filtered_artists} />
                ) : null}
                {/* {this.props.saved_artist_ids_total !== this.props.saved_artist_data_total ? ( */}
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
        saved_artist_ids_total: state.artists.saved_artist_ids_total,
        saved_artist_data_total: state.artists.saved_artist_data_total
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedArtists);
