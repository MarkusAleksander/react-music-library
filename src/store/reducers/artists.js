import * as actionTypes from "./../actions";

const initialState = {
    artists: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_LIST:
            return {
                ...state,
                artists: action.artists,
            };
        case actionTypes.STORE_ITEM:
            return {
                ...state,
                artists: state.artists.concat({
                    artist_id: action.artist_id,
                }),
            };
        case actionTypes.REMOVE_ITEM:
            const updateArray = state.artists.filter((artist) => {
                return artist.artist_id !== action.artist_id;
            });
            return {
                ...state,
                artists: updateArray,
            };
        default:
            return state;
    }
};

export default reducer;
