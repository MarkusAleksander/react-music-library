import * as actionTypes from "./../actions";

const initialState = {
    // * List of ids and gfb_ids
    saved_artist_ids: [],
    saved_artist_ids_total: 0,
    // * list of actual artist data
    saved_artist_data: [],
    saved_artist_data_total: 0,
    // * current queried artist data
    queried_artist_data: [],
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
        case actionTypes.STORE_SAVED_ARTIST_IDS:
            {
                return {
                    ...state,
                    saved_artist_ids: chunkArray(action.saved_artist_ids),
                    saved_artist_ids_total: action.saved_artist_ids.length
                };
            }
        // * store saved artist data
        case actionTypes.STORE_SAVED_ARTIST_DATA:
            {
                let new_array = state.saved_artist_data.flat().concat(action.saved_artist_data);
                return {
                    ...state,
                    saved_artist_data: chunkArray(new_array),
                    saved_artist_data_total: new_array.length
                }
            };
        // * add an artist to the store
        case actionTypes.ADD_ARTIST:
            {
                let new_array = state.saved_artist_ids.flat().concat(
                    action.artist_to_add
                );
                return {
                    ...state,
                    saved_artist_ids: chunkArray(new_array),
                    saved_artist_ids_total: new_array.length
                };
            }
        // * remove artist from the store
        case actionTypes.REMOVE_ARTIST:
            {
                const updated_saved_ids = state.saved_artist_ids.flat().filter(artist => {
                    return (
                        artist.artist_id !== action.artist_to_remove.artist_id &&
                        artist.gfb_id !== action.artist_to_remove.gfb_id
                    )
                });
                const updated_artist_data = state.saved_artist_data.flat().filter((artist) => {
                    return (
                        artist.id !== action.artist_to_remove.artist_id
                    )
                });

                return {
                    ...state,
                    saved_artist_ids: chunkArray(updated_saved_ids),
                    saved_artist_ids_total: updated_saved_ids.length,
                    saved_artist_data: chunkArray(updated_artist_data),
                    saved_artist_data_total: updated_artist_data.length,
                };
            }
        // * store search results
        case actionTypes.STORE_ARTIST_QUERY_RESULTS:
            {
                return {
                    ...state,
                    queried_artist_data: action.queried_artist_data,
                };
            }
        default:
            return state;
    }
};

export default reducer;
