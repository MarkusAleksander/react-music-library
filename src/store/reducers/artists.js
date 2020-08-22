import * as actionTypes from "./../actions";

const initialState = {
    artists: [],
};

const reducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case actionTypes.STORE_ARTISTS:
            return {
                ...state,
                artists: action.artist_data,
            };
        case actionTypes.STORE_ARTIST:
            return {
                ...state,
                artists: state.artists.concat(action.artist_data),
            };
        case actionTypes.REMOVE_ARTIST:
            // debugger;
            const updateArray = state.artists.filter((artist) => {
                return (
                    artist.artist_id !== action.artist_data.artist_id &&
                    artist.gfb_id !== action.artist_data.gfb_id
                );
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
