import * as actionTypes from "./actionTypes";

import axios from "./../../netlify_api";
import { GET_SAVED_ALBUMS, GET_ALBUMS } from "./../../api_endpoints";

const max_album_request_size = 10;

export const request_saved_album_ids = (onComplete) => {
    return (dispatch, getState) => {
        axios
            .get(GET_SAVED_ALBUMS, {
                params: {
                    sortBy: getState().albums.ordering
                }
            })
            .then((res) => {
                if (res.data) {
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            album_id: res.data[keys[i]].album_id,
                            gfb_id: keys[i],
                            status: res.data[keys[i]].status,
                        });
                    }
                    dispatch(store_saved_album_ids(new_array));
                    onComplete && onComplete();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const store_saved_album_ids = (saved_album_ids) => {
    return {
        type: actionTypes.STORE_SAVED_ALBUM_IDS,
        saved_album_ids
    }
}

export const request_saved_album_data = (onComplete) => {
    return (dispatch, getState) => {

        // * get the current album state
        let state = getState().albums;

        if (state.next_requestable_set > 13) {
            debugger;
        }

        // * set up array to hold ids we want data on
        let requested_ids = [];

        // * quick check that we don't already have all the data for the ids
        // * doing ids less than or equal to in the edge case we end up with more data than
        // * ids (should never occur)
        if (state.saved_album_ids_total < state.saved_album_data_total) {
            console.warn(
                "Saved IDs is less than saved data: ",
                "ids ".concat(state.saved_album_ids_total),
                "data: ".concat(state.saved_album_data_total)
            );
        }
        if (state.saved_album_ids_total <= state.saved_album_data_total) return;

        // * check what set of data we want
        if (
            state.saved_album_ids.length === state.saved_album_data.length
            // * we have a id:data mismatch and
            // * the (chunked) id length is equal to the (chunked) data length
        ) {
            // * then we have a non-complete chunk that needs data

            // * get all the ids
            let ids = state.saved_album_ids.flat().map(id => id.album_id);
            // * get all the data
            let data = state.saved_album_data.flat().map(data => data.id);

            // * filter down to find which data bits we don't have
            // * Note = don't assume is just the final chunk
            requested_ids = ids.filter((id) => {
                return !data.includes(id);
            });

        } else {
            // * we have an id:data mismatch and
            // * the (chunked) id length is NOT equal to the (chunked) data length
            // * then we need to request the next requestable chunk
            if (!state.saved_album_ids[state.next_requestable_set]) {
                alert("Attempting to access out of bound array");
                debugger;
            }
            requested_ids = state.saved_album_ids[state.next_requestable_set].map(album => album.album_id);
        }

        // * ensure we haven't selected too many
        if (requested_ids.length > max_album_request_size) {
            requested_ids = requested_ids.slice(0, max_album_request_size - 1);
        }

        // * request the data
        axios
            .get(GET_ALBUMS, {
                params: {
                    album_ids: requested_ids
                },
            })
            .then((res) => {
                // * dispatch the data to store
                dispatch(store_saved_album_data(res.data.albums));
                // * run provided onComplete callback
                onComplete();
            })
            .catch((err) => console.log(err));
    }
}

export const store_saved_album_data = (saved_album_data) => {
    return {
        type: actionTypes.STORE_SAVED_ALBUM_DATA,
        saved_album_data
    }
}

export const add_album = (album_to_add) => {
    return {
        type: actionTypes.ADD_ALBUM,
        album_to_add
    }
}
export const update_album = (album_to_update) => {
    return {
        type: actionTypes.UPDATE_ALBUM,
        album_to_update
    }
}
export const remove_album = (album_to_remove) => {
    return {
        type: actionTypes.REMOVE_ALBUM,
        album_to_remove
    }
}
export const store_album_query_results = (queried_album_data) => {
    return {
        type: actionTypes.STORE_ALBUM_QUERY_RESULTS,
        queried_album_data
    }
}
export const update_album_ordering = (ordering) => {
    return {
        type: actionTypes.UPDATE_ALBUM_ORDERING,
        ordering
    }
}

export const handle_album_ordering_update = (ordering, onComplete) => {
    return (dispatch) => {
        dispatch(update_album_ordering(ordering));
        dispatch(request_saved_album_ids(onComplete));
    }
}