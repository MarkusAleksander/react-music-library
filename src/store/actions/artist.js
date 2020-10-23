import * as actionTypes from "./actionTypes";

import axios from "./../../netlify_api";
import { GET_SAVED_ARTISTS } from "./../../api_endpoints";

export const request_saved_artist_ids = () => {
    return dispatch => {
        axios
            .get(GET_SAVED_ARTISTS)
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