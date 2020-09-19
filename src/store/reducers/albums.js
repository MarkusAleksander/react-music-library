import * as actionTypes from "./../actions";

const initialState = {
    // * list of ids and gfb_ids
    saved_album_ids: [],
    // * total saved album ids
    saved_album_ids_total: 0,
    // * list of actual artist data
    saved_album_data: [],
    // * total saved album data
    saved_album_data_total: 0,
    // * current queried album data
    queried_album_data: [],
};

const request_limit = 10;

const chunkArray = (myArray, chunk_size) => {
    var results = [];
    var arr = [...myArray];

    chunk_size = chunk_size ? chunk_size : request_limit;

    while (arr.length) {
        results.push(arr.splice(0, chunk_size));
    }

    return results;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // * store saved ids from firebase
        case actionTypes.STORE_SAVED_ALBUM_IDS:
            {
                return {
                    ...state,
                    saved_album_ids: chunkArray(action.saved_album_ids),
                    saved_album_ids_total: action.saved_album_ids.length
                };
            }
        // * store saved album data
        case actionTypes.STORE_SAVED_ALBUM_DATA:
            {
                let new_array = state.saved_album_data.flat().concat(action.saved_album_data)
                return {
                    ...state,
                    saved_album_data: chunkArray(new_array),
                    saved_album_data_total: new_array.length
                };
            }
        // * add album to the store
        case actionTypes.ADD_ALBUM:
            {
                let new_array = state.saved_album_ids.flat().concat(
                    action.album_to_add
                );
                return {
                    ...state,
                    saved_album_ids: chunkArray(new_array),
                    saved_album_ids_total: new_array.length
                };
            }
        case actionTypes.UPDATE_ALBUM:
            {
                const saved_albums = state.saved_album_ids.flat();

                let idx = saved_albums.findIndex((album) => {
                    return album.album_id === action.album_to_update.album_id;
                });
                saved_albums[idx] = action.album_to_update.album;
                return {
                    ...state,
                    albums: saved_albums,
                };
            }
        case actionTypes.REMOVE_ALBUM:
            {
                const update_saved_ids = state.saved_album_ids.flat().filter((album) => {
                    return (
                        album.album_id !== action.album_to_remove.album_id &&
                        album.gfb_id !== action.album_to_remove.gfb_id
                    );
                });
                const update_saved_data = state.saved_album_data.flat().filter((album) => {
                    return (
                        album.id !== action.album_to_remove.album_id
                    );
                });

                return {
                    ...state,
                    saved_album_ids: chunkArray(update_saved_ids),
                    saved_album_ids_total: update_saved_ids.length,
                    saved_album_data: chunkArray(update_saved_data),
                    saved_album_data_total: update_saved_data.length
                };
            }
        case actionTypes.STORE_ALBUM_QUERY_RESULTS:
            {
                return {
                    ...state,
                    queried_album_data: action.queried_album_data,
                };
            }
        default:
            return state;
    }
};

export default reducer;
