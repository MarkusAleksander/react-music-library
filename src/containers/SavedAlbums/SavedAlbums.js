import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import * as orderTypes from "../../store/actions/orderTypes";

import Level from "./../../components/UI/Level/Level";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";

import AlbumList from "./../../components/AlbumList/AlbumList";

class SavedAlbums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter_text: "",
            filter_status: "",
            is_requesting: false,
            is_reordering: false,
            observer_is_active: false
        };

        this.observer = new IntersectionObserver(this.onObserve);

        this.lazy_loader_ref = React.createRef();
    }

    componentDidMount() {
        // * component is mounted - prepare the lazy loader observer for scroll api requests
        this.setUpLazyLoaderObserver();
        // * do we have some album ids yet to request data on?
        if (this.props.saved_album_ids_total) {
            this.handleObserver();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // * If we have album ids to work with...
        if (this.props.saved_album_ids_total) {
            // * handle the observer status
            this.handleObserver();
        }

        // * If we have album ids to work with
        // * And no album data yet
        // * and we're not waiting on some data to load.. 
        // * to handle when no data has yet been requested
        if (
            this.props.saved_album_ids_total
            && !this.props.saved_album_data_total
            && !this.state.is_requesting
        ) {
            // * check if we need to request any data
            this.handleShouldRequestAlbumData();
        }
    }

    // * Handle the observer
    handleObserver = () => {
        if (
            this.state.observer_is_active
            && this.props.saved_album_ids_total === this.props.saved_album_data_total
        ) {
            // * if the observer is active
            // * and the total of stored ids equals the total of saved data
            // * then we can disconnect
            this.disconnectLazyLoaderObserver();
        } else if (
            !this.state.observer_is_active
            && this.props.saved_album_ids_total > this.props.saved_album_data_total
        ) {
            // * else if the observer is inactive
            // * and the total of stored ids is greater than the total of saved data
            // * then we need to connect the lazy observer
            this.setUpLazyLoaderObserver();
        }
    }

    setUpLazyLoaderObserver = () => {
        // * sanity check in case this is called from elsewhere other than the handler
        if (this.state.observer_is_active) return;

        this.observer.observe(this.lazy_loader_ref.current);

        this.setState({
            observer_is_active: true
        });
    }

    // * setup the lazy observer
    onObserve = (entries) => {
        // * don't send a request if we're already waiting
        if (this.state.is_requesting) return;

        entries.forEach((entry) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                // * Request some more Album data
                this.handleShouldRequestAlbumData();
            }
        });
    }

    // * disconnect the lazy loader when we're done with it
    disconnectLazyLoaderObserver = () => {
        if (!this.state.observer_is_active) return;

        this.observer.disconnect();

        this.setState({
            observer_is_active: false
        });
    }

    // * Do we need to request any Album data?
    handleShouldRequestAlbumData = () => {
        if (
            // * check we have ids to request
            // * and the total amount of data already requested is not equal to the number of ids wanted
            // * and we're not waiting on some other data to arrive
            this.props.saved_album_ids_total
            && this.props.saved_album_ids_total !== this.props.saved_album_data_total
            && !this.state.is_requesting
        ) {
            this.requestAlbumData();
        }
    }

    // * Send request for some data
    requestAlbumData = () => {
        // * sanity check - don't need to request more when we're already waiting
        if (this.state.is_requesting) return;

        // * get album data
        this.props.requestSavedAlbumData(this.onDataReceived);

        // * Set that we're waiting on some data to come in
        this.setState({
            is_requesting: true
        });
    };

    // * Handle when album data is received
    onDataReceived = () => {
        this.setState({
            is_requesting: false
        });
    }

    // * Handle selecting order change
    onChangeOrdering = (ordering) => {
        // * if already waiting on reordered data, return
        if (this.state.is_reordering) return;

        // * dispatch to store to request reordered data
        this.props.updateAlbumOrdering(ordering, this.onChangeOrderingCompleted);

        // * flag that we're waiting on reordered data
        this.setState({
            is_reordering: true
        });
    };

    // * callback for when reordered data has completed
    onChangeOrderingCompleted = () => {
        this.setState({
            is_reordering: false
        })
    }

    onChangeFilterState = (filter_status) => {
        if (filter_status === "have" || filter_status === "want") {
            if (filter_status === this.state.filter_status) filter_status = "";
            this.setState({ filter_status })
        }
    }

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
                                    (this.props.ordering === orderTypes.ORDER_AZ
                                        ? "is-primary"
                                        : "is-info").concat(
                                            this.state.is_reordering ? " is-loading" : ""
                                        )
                                }
                                content="A-Z"
                                onClick={
                                    this.props.ordering !== orderTypes.ORDER_AZ ?
                                        () => this.onChangeOrdering(orderTypes.ORDER_AZ) : null}
                            />
                            <Button
                                className={
                                    (this.props.ordering === orderTypes.ORDER_ZA
                                        ? "is-primary"
                                        : "is-info").concat(
                                            this.state.is_reordering ? " is-loading" : ""
                                        )
                                }
                                content="Z-A"
                                onClick={
                                    this.props.ordering !== orderTypes.ORDER_ZA ?
                                        () => this.onChangeOrdering(orderTypes.ORDER_ZA) : null}
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
                    <AlbumList layout_classname={"is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"} albums={filtered_albums} />
                ) : null}
                {/* {this.props.saved_album_ids_total !== this.props.saved_album_data_total ? ( */}
                <div className="lazy-loader" ref={this.lazy_loader_ref}>
                    {this.state.is_requesting ? <div className="section"><p className="has-text-centered">Loading more...</p></div> : null}
                </div>
                {/* ) : null} */}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestSavedAlbumData: (onComplete) => {
            dispatch(
                actionCreators.request_saved_album_data(onComplete)
            )
        },
        updateAlbumOrdering: (ordering, onComplete) => {
            dispatch(
                actionCreators.handle_album_ordering_update(ordering, onComplete)
            )
        }
    };
};

const mapStateToProps = (state) => {
    return {
        saved_album_ids: state.albums.saved_album_ids,
        saved_album_data: state.albums.saved_album_data,
        saved_album_ids_total: state.albums.saved_album_ids_total,
        saved_album_data_total: state.albums.saved_album_data_total,
        ordering: state.albums.ordering
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
