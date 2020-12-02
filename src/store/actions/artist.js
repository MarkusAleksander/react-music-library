import * as actionTypes from "./actionTypes";

import axios from "./../../netlify_api";
import { GET_SAVED_ARTISTS, GET_ARTISTS } from "./../../api_endpoints";

const max_artist_request_size = 10;

export const request_saved_artist_ids = (onComplete) => {
    return (dispatch, getState) => {
        axios
            .get(GET_SAVED_ARTISTS, {
                params: {
                    sortBy: getState().artists.ordering
                }
            })
            .then((res) => {
                if (res.data) {
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            artist_id: res.data[keys[i]].artist_id,
                            gfb_id: keys[i],
                            status: "saved",
                        });
                    }
                    dispatch(store_saved_artist_ids(new_array));
                    onComplete && onComplete();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const store_saved_artist_ids = (saved_artist_ids) => {
    return {
        type: actionTypes.STORE_SAVED_ARTIST_IDS,
        saved_artist_ids
    }
}

export const request_saved_artist_data = (onComplete) => {
    return (dispatch, getState) => {

        // * get the current artists state
        let state = getState().artists;

        // * set up array to hold ids we want data on
        let requested_ids = [];

        // * quick check that we don't already have all the data for the ids
        // * doing ids less than or equal to in the edge case we end up with more data than
        // * ids (should never occur)
        if (state.saved_artist_ids_total < state.saved_artist_data_total) {
            console.warn(
                "Saved IDs is less than saved data: ",
                "ids: ".concat(state.saved_artist_ids_total),
                "data: ".concat(state.saved_artist_data_total)
            );
        }
        if (state.saved_artist_ids_total <= state.saved_artist_data_total) return;

        // * check what set of data we want
        if (state.saved_artist_ids.length === state.saved_artist_data.length
            // * we have a id:data mismatch and
            // * the (chunked) id length is equal to the (chunked) data length
        ) {
            // * then we have a non-complete chunk that needs data

            // * Get all the ids
            let ids = state.saved_artist_ids.flat().map(id => id.artist_id);
            // * get all the data
            let data = state.saved_artist_data.flat().map(data => data.id);

            // * filter down to find which data bits we don't have
            // * Note - don't assume is just the final chunk
            requested_ids = ids.filter((id) => {
                return !data.includes(id);
            });

        } else {
            // * we have an id:data mismatch and
            // * the (chunked) id length is NOT equal to the (chunked) data length
            // * then we need to request the next requestable chunk
            if (!state.saved_artist_ids[state.next_requestable_set]) {
                alert("Attempting to access out of bound array");
                debugger;
            }
            requested_ids = state.saved_artist_ids[state.next_requestable_set].map(artist => artist.artist_id);
        }

        // * ensure we haven't selected too many
        if (requested_ids.length > max_artist_request_size) {
            requested_ids = requested_ids.slice(0, max_artist_request_size - 1);
        }

        // * request the data
        axios
            .get(GET_ARTISTS, {
                params: {
                    artist_ids: requested_ids
                },
            })
            .then((res) => {
                // * dispatch the data to store
                dispatch(store_saved_artist_data(res.data.artists));
                // * run provided onComplete callback
                // TODO - is this good practice?
                onComplete();
            })
            .catch((err) => console.log(err));
    }
}

export const store_saved_artist_data = (saved_artist_data) => {
    return {
        type: actionTypes.STORE_SAVED_ARTIST_DATA,
        saved_artist_data
    }
}

export const add_artist = (artist_to_add) => {
    return {
        type: actionTypes.ADD_ARTIST,
        artist_to_add
    }
}

export const remove_artist = (artist_to_remove) => {
    return {
        type: actionTypes.REMOVE_ARTIST,
        artist_to_remove
    }
}

export const store_artist_query_results = (queried_artist_data) => {
    return {
        type: actionTypes.STORE_ARTIST_QUERY_RESULTS,
        queried_artist_data
    }
}

export const update_artist_ordering = (ordering) => {
    return {
        type: actionTypes.UPDATE_ARTIST_ORDERING,
        ordering
    }
}

export const handle_artist_ordering_update = (ordering, onComplete) => {
    return (dispatch) => {
        dispatch(update_artist_ordering(ordering));
        dispatch(request_saved_artist_ids(onComplete));
    }
}