import * as actionTypes from "./../actions/actionTypes";
import * as orderTyoes from "./../actions/orderTypes";

import { updateObject, chunkArray } from "./../utility";

const initialState = {
    // * List of ids and gfb_ids
    saved_artist_ids: [],
    // * total saved artist ids
    saved_artist_ids_total: 0,
    // * list of actual artist data
    saved_artist_data: [],
    // * total saved artist data
    saved_artist_data_total: 0,
    // * current queried artist data
    queried_artist_data: [],
    // * next requestable set
    next_requestable_set: 0,
    // * ordering
    ordering: orderTyoes.ORDER_NONE
};

const storeSavedArtistIDs = (state, action) => {
    return updateObject(
        state,
        {
            saved_artist_ids: chunkArray(action.saved_artist_ids),
            saved_artist_ids_total: action.saved_artist_ids.length,
            saved_artist_data: [],
            saved_artist_data_total: 0,
            next_requestable_set: 0
        }
    )
}

const storeSavedArtistData = (state, action) => {
    let new_array = state.saved_artist_data.flat().concat(action.saved_artist_data);
    let next_requestable_set = state.next_requestable_set >= state.saved_artist_ids.length ? state.next_requestable_set : state.next_requestable_set + 1;

    return updateObject(
        state,
        {
            saved_artist_data: chunkArray(new_array),
            saved_artist_data_total: new_array.length,
            next_requestable_set
        }
    )
}

const addArtist = (state, action) => {
    let new_array = state.saved_artist_ids.flat().concat(
        action.artist_to_add
    );
    return updateObject(
        state,
        {
            saved_artist_ids: chunkArray(new_array),
            saved_artist_ids_total: new_array.length
        }
    )
}

const removeArtist = (state, action) => {
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


    return updateObject(
        state,
        {
            saved_artist_ids: chunkArray(updated_saved_ids),
            saved_artist_ids_total: updated_saved_ids.length,
            saved_artist_data: chunkArray(updated_artist_data),
            saved_artist_data_total: updated_artist_data.length,
        }
    );
}

const storeArtistQueryResults = (state, action) => {
    return updateObject(
        state,
        {
            queried_artist_data: action.queried_artist_data,
        }
    )
}

const updateArtistOrdering = (state, action) => {
    return updateObject(
        state,
        {
            ordering: action.ordering
        }
    )
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // * store saved ids from firebase
        case actionTypes.STORE_SAVED_ARTIST_IDS:
            return storeSavedArtistIDs(state, action);
        // * store saved artist data
        case actionTypes.STORE_SAVED_ARTIST_DATA:
            return storeSavedArtistData(state, action);
        // * add an artist to the store
        case actionTypes.ADD_ARTIST:
            return addArtist(state, action);
        // * remove artist from the store
        case actionTypes.REMOVE_ARTIST:
            return removeArtist(state, action);
        // * store search results
        case actionTypes.STORE_ARTIST_QUERY_RESULTS:
            return storeArtistQueryResults(state, action);
        case actionTypes.UPDATE_ARTIST_ORDERING:
            return updateArtistOrdering(state, action);
        default:
            return state;
    }
};

export default reducer;
