import { createStore, combineReducers } from "redux";

import artistsReducer from "./reducers/artists";
import albumsReducer from "./reducers/albums";

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
