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
