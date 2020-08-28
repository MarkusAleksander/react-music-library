import * as actionTypes from "./../actions";

const initialState = {
    // * list of ids and gfb_ids
    saved_album_ids: [],
    // * list of actual artist data
    saved_album_data: [],
    // * current queried album data
    queried_album_data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // * store saved ids from firebase
        case actionTypes.STORE_SAVED_ALBUM_IDS:
            return {
                ...state,
                saved_album_ids: action.saved_album_ids,
            };
        // * store saved album data
        case actionTypes.STORE_SAVED_ALBUM_DATA:
            return {
                ...state,
                saved_album_data: action.saved_album_data,
            };
        // * add album to the store
        case actionTypes.ADD_ALBUM:
            return {
                ...state,
                saved_album_ids: state.saved_album_ids.concat(
                    action.album_to_add
                ),
            };
        case actionTypes.UPDATE_ALBUM:
            const saved_albums = state.saved_album_ids.filter((album) => {
                return true;
            });
            let idx = saved_albums.findIndex((album) => {
                return album.album_id === action.album_to_update.album_id;
            });
            saved_albums[idx] = action.album_to_update.album;
            return {
                ...state,
                albums: saved_albums,
            };
        case actionTypes.REMOVE_ALBUM:
            const _filter = (album) => {
                return (
                    album.album_id !== action.album_to_remove.album_id &&
                    album.gfb_id !== action.album_to_remove.gfb_id
                );
            };

            const update_saved_ids = state.saved_album_ids.filter(_filter);
            const update_saved_data = state.saved_album_data.filter(_filter);

            return {
                ...state,
                saved_album_ids: update_saved_ids,
                saved_album_data: update_saved_data,
            };
        case actionTypes.STORE_ALBUM_QUERY_RESULTS:
            return {
                ...state,
                queried_album_data: action.queried_album_data,
            };
        default:
            return state;
    }
};

export default reducer;
