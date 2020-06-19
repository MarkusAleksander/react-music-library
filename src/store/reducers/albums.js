import * as actionTypes from "./../actions";

const initialState = {
    albums: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_LIST:
            return {
                ...state,
                albums: action.albums,
            };
        case actionTypes.STORE_ITEM:
            return {
                ...state,
                albums: state.albums.concat({
                    album_id: action.album_id,
                    status: action.status,
                }),
            };
        case actionTypes.REMOVE_ITEM:
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
