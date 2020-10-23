import * as actionTypes from "./actionTypes";

import axios from "./../../netlify_api";
import { GET_SAVED_ALBUMS } from "./../../api_endpoints";

export const request_saved_album_ids = () => {
    return dispatch => {

        axios
            .get(GET_SAVED_ALBUMS)
            .then((res) => {
                if (res.data) {
                    let keys = Object.keys(res.data);
                    let new_array = [];
                    for (let i = 0; i < keys.length; i++) {
                        new_array.push({
                            album_id: res.data[keys[i]].album_id,
                            status: res.data[keys[i]].status,
                            gfb_id: keys[i],
                        });
                    }
                    dispatch(store_saved_album_ids(new_array))
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