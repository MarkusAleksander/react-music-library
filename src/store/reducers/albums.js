import * as actionTypes from "./../actions";

const initialState = {
    albums: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ALBUMS:
            return {
                ...state,
                albums: action.album_data,
            };
        case actionTypes.STORE_ALBUM:
            return {
                ...state,
                albums: state.albums.concat(action.album_data),
            };
        case actionTypes.UPDATE_ALBUM:
            // debugger;
            const albums = state.albums.filter((album) => {
                return true;
            });
            let idx = albums.findIndex((album) => {
                return album.album_id === action.album_data.album_id;
            });
            albums[idx] = action.album_data.album;
            return {
                ...state,
                albums: albums,
            };
        case actionTypes.REMOVE_ALBUM:
            const updateArray = state.albums.filter((album) => {
                return album.album_id !== action.album_id;
            });
            return {
                ...state,
                albums: updateArray,
            };
        default:
            return state;
    }
};

export default reducer;
