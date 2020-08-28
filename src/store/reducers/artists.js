import * as actionTypes from "./../actions";

const initialState = {
    // * List of ids and gfb_ids
    saved_artist_ids: [],
    // * list of actual artist data
    saved_artist_data: [],
    // * current queried artist data
    queried_artist_data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // * store saved ids from firebase
        case actionTypes.STORE_SAVED_ARTIST_IDS:
            // ;
            return {
                ...state,
                saved_artist_ids: action.saved_artist_ids,
            };
        // * store saved artist data
        case actionTypes.STORE_SAVED_ARTIST_DATA:
            // ;
            return {
                ...state,
                saved_artist_data: action.saved_artist_data,
            };
        // * add an artist to the store
        case actionTypes.ADD_ARTIST:
            return {
                ...state,
                saved_artist_ids: state.saved_artist_ids.concat(
                    action.artist_to_add
                ),
            };
        // * remove artist from the store
        case actionTypes.REMOVE_ARTIST:
            const _filter = (artist) => {
                return (
                    artist.artist_id !== action.artist_to_remove.artist_id &&
                    artist.gfb_id !== action.artist_to_remove.gfb_id
                );
            };

            const updated_saved_ids = state.saved_artist_ids.filter(_filter);
            const updated_artist_data = state.saved_artist_data.filter(_filter);

            return {
                ...state,
                saved_artist_ids: updated_saved_ids,
                saved_artist_data: updated_artist_data,
            };
        // * store search results
        case actionTypes.STORE_ARTIST_QUERY_RESULTS:
            return {
                ...state,
                queried_artist_data: action.queried_artist_data,
            };
        default:
            return state;
    }
};

export default reducer;
