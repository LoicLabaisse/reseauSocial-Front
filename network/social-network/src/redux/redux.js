import {
    configureStore,
    applyMiddleware,
} from "@reduxjs/toolkit";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";
import {loginSlice} from "./slices/loginSlices/loginSlice";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['users', "strava", "newPlan", "updateForm"]
};
const reducers = combineReducers({
    login : loginSlice.reducer,
    persistConfig,
});

const rootReducers = (state, action) => {
    if (action.type === "logOut") {
        storage.removeItem('persist:root')

        return reducers(undefined, action)
    } else {
        return reducers(state, action)
    }
}

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: composeWithDevTools(applyMiddleware(thunk)),
    middleware: [thunk],
});

export let persistor = persistStore(store);
