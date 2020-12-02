import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";
import * as orderTypes from "../../store/actions/orderTypes";

import Level from "./../../components/UI/Level/Level";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";

import AlbumList from "./../../components/AlbumList/AlbumList";

import * as stateTypes from "./../../stateTypes";

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

    // * Update filter option state
    onChangeFilterState = (filter_status) => {
        if (filter_status === stateTypes.HAVE || filter_status === stateTypes.WANT) {
            if (filter_status === this.state.filter_status) filter_status = "";
            this.setState({ filter_status })
        }
    }

    // * update filter text
    updateFilterText = (e) => {
        let filter_text = e.target.value;

        this.setState({
            filter_text,
        });
    };

    // * handle text filtering items
    filterItemsByText = (array, filter_text) => {
        return array.filter(album => {
            return album.name.toLowerCase().includes(filter_text) ||
                album.artists.some((artist) => {
                    return (
                        artist.name
                            .toLowerCase()
                            .indexOf(filter_text) > -1
                    );
                });
        });
    }

    // * handle status filtering items
    filterItemsByStatus = (array, filter_status) => {
        let filtered_ids = this.props.saved_album_ids.flat().filter(album => album.status === filter_status);
        return array.filter((album) => {
            return (
                filtered_ids.find(a => a.album_id === album.id)
            )
        });
    }

    render() {
        // * get albums (assumed filtered (including not filtered))
        let filtered_albums = this.props.saved_album_data.flat();

        // * if filter status, then filter by status
        if (this.state.filter_status !== "") {
            filtered_albums = this.filterItemsByStatus(filtered_albums, this.state.filter_status);
        }

        // * if filter text, then do filter
        if (this.state.filter_text !== "") {
            filtered_albums = this.filterItemsByText(filtered_albums, this.state.filter_text.toLocaleLowerCase());
        }

        // * create ordering buttons
        const order_buttons = [orderTypes.ORDER_AZ, orderTypes.ORDER_ZA].map((order) => {
            return <Button
                key={order}
                className={
                    (this.props.ordering === order
                        ? "is-primary"
                        : "is-info").concat(
                            this.state.is_reordering ? " is-loading" : ""
                        )
                }
                content={order.toUpperCase()}
                onClick={
                    this.props.ordering !== order ?
                        () => this.onChangeOrdering(order) : null}
            />
        });

        const status_buttons = [stateTypes.HAVE, stateTypes.WANT].map((status) => {
            return <Button
                key={status}
                className={
                    this.state.filter_status === status
                        ? "is-primary"
                        : "is-info"
                }
                content={status}
                onClick={() => this.onChangeFilterState(status)}
            />
        });

        return (
            <div className="section">
                <Level
                    level_left_content={[
                        <div className="buttons">
                            {order_buttons}
                            {status_buttons}
                        </div>,
                        <Input
                            onChange={this.updateFilterText}
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
                    <AlbumList layout_classname={this.props.layout_classname} albums={filtered_albums} />
                ) : null}
                <div className="lazy-loader" ref={this.lazy_loader_ref}>
                    {this.state.is_requesting ? <div className="section"><p className="has-text-centered">Loading more...</p></div> : null}
                </div>
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
