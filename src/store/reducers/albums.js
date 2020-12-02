import * as actionTypes from "./../actions/actionTypes";
import * as orderTypes from "./../actions/orderTypes";

import { updateObject, chunkArray } from "./../utility";

const initialState = {
    // * list of ids and gfb_ids
    saved_album_ids: [],
    // * total saved album ids
    saved_album_ids_total: 0,
    // * list of actual album data
    saved_album_data: [],
    // * total saved album data
    saved_album_data_total: 0,
    // * current queried album data
    queried_album_data: [],
    // * next requestable set
    next_requestable_set: 0,
    // * ordering
    ordering: orderTypes.ORDER_NONE
};

const storeSavedAlbumIDs = (state, action) => {
    return updateObject(
        state,
        {
            saved_album_ids: chunkArray(action.saved_album_ids),
            saved_album_ids_total: action.saved_album_ids.length,
            saved_album_data: [],
            saved_album_data_total: 0,
            next_requestable_set: 0,
        }
    );
}

const storeSavedAlbumData = (state, action) => {
    // TODO - LOGIC EDGE ERROR TO RESOLVE
    let old_array_length = state.saved_album_data.length;

    let updated_array = state.saved_album_data.flat().concat(action.saved_album_data);
    let new_array = chunkArray(updated_array);

    let new_array_length = new_array.length;

    let next_requestable_set = state.next_requestable_set;

    if (new_array_length > old_array_length && state.next_requestable_set < state.saved_album_ids.length) {
        next_requestable_set = state.next_requestable_set >= state.saved_album_ids.length ? state.next_requestable_set : state.next_requestable_set + 1;
    }

    return updateObject(
        state,
        {
            saved_album_data: chunkArray(updated_array),
            saved_album_data_total: updated_array.length,
            next_requestable_set
        }
    );
}

const addAlbum = (state, action) => {
    let new_array = state.saved_album_ids.flat().concat(
        action.album_to_add
    );

    return updateObject(
        state,
        {
            saved_album_ids: chunkArray(new_array),
            saved_album_ids_total: new_array.length
        }
    );
}

const updateAlbum = (state, action) => {
    const saved_albums = [...state.saved_album_ids.flat()];

    let idx = saved_albums.findIndex((album) => {
        return album.album_id === action.album_to_update.album_id;
    });
    saved_albums[idx] = action.album_to_update.album;

    return updateObject(
        state,
        {
            saved_album_ids: chunkArray(saved_albums),
        }
    );
}

const removeAlbum = (state, action) => {
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

    return updateObject(
        state,
        {
            saved_album_ids: chunkArray(update_saved_ids),
            saved_album_ids_total: update_saved_ids.length,
            saved_album_data: chunkArray(update_saved_data),
            saved_album_data_total: update_saved_data.length
        }
    );
}

const storeAlbumQueryResults = (state, action) => {
    return updateObject(
        state,
        {
            queried_album_data: action.queried_album_data,
        }
    );
}

const updateAlbumOrdering = (state, action) => {
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
        case actionTypes.STORE_SAVED_ALBUM_IDS:
            return storeSavedAlbumIDs(state, action);
        // * store saved album data
        case actionTypes.STORE_SAVED_ALBUM_DATA:
            return storeSavedAlbumData(state, action);
        // * add album to the store
        case actionTypes.ADD_ALBUM:
            return addAlbum(state, action);
        case actionTypes.UPDATE_ALBUM:
            return updateAlbum(state, action);
        case actionTypes.REMOVE_ALBUM:
            return removeAlbum(state, action);
        case actionTypes.STORE_ALBUM_QUERY_RESULTS:
            return storeAlbumQueryResults(state, action);
        case actionTypes.UPDATE_ALBUM_ORDERING:
            return updateAlbumOrdering(state, action);
        default:
            return state;
    }
};

export default reducer;
