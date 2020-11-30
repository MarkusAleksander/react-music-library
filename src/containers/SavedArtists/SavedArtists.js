import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import * as orderTypes from "../../store/actions/orderTypes";

import Level from "./../../components/UI/Level/Level";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";

import ArtistList from "./../../components/ArtistList/ArtistList";

class SavedArtists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ordering: "",
            filter_text: "",
            is_requesting: false,
            is_reordering: false,
            observer_is_active: false
        };

        this.observer = new IntersectionObserver(this.onObserve);

        this.lazy_loader_ref = React.createRef();
    }

    componentDidMount() {
        // * prepare lazy loader observer
        this.setUpLazyLoaderObserver();
        // * do we have some artist ids yet to request data on?
        if (this.props.saved_artist_ids_total) {
            this.handleObserver();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // * If we have artist ids to work with...
        if (this.props.saved_artist_ids_total) {
            // * handle the observer status
            this.handleObserver();
        }

        // * If we have artist ids to work with
        // * And no artist data yet
        // * and we're not waiting on some data to load.. 
        // * to handle when no data has yet been requested
        if (
            this.props.saved_artist_ids_total
            && !this.props.saved_artist_data_total
            && !this.state.is_requesting
        ) {
            // * check if we need to request any data
            this.handleShouldRequestArtistData();
        }
    }

    // * Handle the observer
    handleObserver = () => {
        if (
            this.state.observer_is_active
            && this.props.saved_artist_ids_total === this.props.saved_artist_data_total
        ) {
            // * if the observer is active
            // * and the total of stored ids equals the total of saved data
            // * then we can disconnect
            this.disconnectLazyLoaderObserver();
        } else if (
            !this.state.observer_is_active
            && this.props.saved_artist_ids_total > this.props.saved_artist_data_total
        ) {
            // * else if the observer is inactive
            // * and the total of stored ids is greater than the total of saved data
            // * then we need to connect the lazy observer
            this.setUpLazyLoaderObserver();
        }
    }

    // * setup the lazy observer
    setUpLazyLoaderObserver = () => {
        // * sanity check in case this is called from elsewhere other than the handler
        if (this.state.observer_is_active) return;

        this.observer.observe(this.lazy_loader_ref.current);

        this.setState({
            observer_is_active: true
        });
    }

    // * On observe
    onObserve = (entries) => {
        // * don't send a request if we're already waiting
        if (this.state.is_requesting) return;

        entries.forEach((entry) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                // * Request some more Artist data
                this.handleShouldRequestArtistData();
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

    // * Do we need to request any Artist data?
    handleShouldRequestArtistData = () => {
        if (
            // * check we have ids to request
            // * and the total amount of data already requested is not equal to the number of ids wanted
            // * and we're not waiting on some other data to arrive
            this.props.saved_artist_ids_total
            && this.props.saved_artist_ids_total !== this.props.saved_artist_data_total
            && !this.state.is_requesting
        ) {
            this.requestArtistData();
        }
    }

    // * Send request for some data
    requestArtistData = () => {
        // * sanity check - don't need to request more when we're already waiting
        if (this.state.is_requesting) return;

        // * get artist data
        this.props.requestSavedArtistData(this.onDataReceived);

        // * Set that we're waiting on some data to come in
        this.setState({
            is_requesting: true
        });
    };

    // * Handle when artist data is received
    onDataReceived = () => {
        this.setState({
            is_requesting: false
        });
    }

    onChangeOrdering = (ordering) => {
        // * if already waiting on reordered data, return
        if (this.state.is_reordering) return;

        // * dispatch to store to request reordered data
        this.props.updateArtistOrdering(ordering, this.onChangeOrderingComplete);

        // * flag that we're waiting on reordered data
        this.setState({
            is_reordering: true
        });
    };

    // * callback for whe reordered data has completed
    onChangeOrderingComplete = () => {
        this.setState({
            is_reordering: false
        });
    }

    updateFilterTest = (e) => {
        let filter_text = e.target.value;

        this.setState({
            filter_text,
        });
    };

    render() {
        let filtered_artists = this.props.saved_artist_data.flat();
        if (this.state.filter_text !== "") {
            filtered_artists = filtered_artists.filter((artist) =>
                artist.name.toLowerCase().includes(this.state.filter_text)
            );
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
                                        () => this.onChangeOrdering(orderTypes.ORDER_AZ) : null
                                }
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
                    <ArtistList layout_classname={"is-full-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen"} artists={filtered_artists} />
                ) : null}
                {/* {this.props.saved_artist_ids_total !== this.props.saved_artist_data_total ? ( */}
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
        requestSavedArtistData: (onComplete) => {
            dispatch(
                actionCreators.request_saved_artist_data(onComplete)
            );
        },
        updateArtistOrdering: (ordering, onComplete) => {
            dispatch(
                actionCreators.handle_artist_ordering_update(ordering, onComplete)
            )
        }
        // onStoreArtistData: (saved_artist_data) =>
        //     dispatch(
        //         actionCreators.store_saved_artist_data(saved_artist_data)
        //     ),
    };
};

const mapStateToProps = (state) => {
    return {
        saved_artist_ids: state.artists.saved_artist_ids,
        saved_artist_data: state.artists.saved_artist_data,
        saved_artist_ids_total: state.artists.saved_artist_ids_total,
        saved_artist_data_total: state.artists.saved_artist_data_total,
        ordering: state.artists.ordering
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedArtists);
