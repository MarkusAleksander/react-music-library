import { createStore, combineReducers } from "redux";

import artistsReducer from "./reducers/artists";
import albumsReducer from "./reducers/albums";

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
});

const store = createStore(rootReducer);

export default store;
