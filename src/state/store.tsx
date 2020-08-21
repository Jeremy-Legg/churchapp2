import {combineReducers} from 'redux'
import {useDispatch} from "react-redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import uiSlice from "./ui-state";

let rootReducers = combineReducers({
    ui: uiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>

let store = configureStore({
    reducer: rootReducers,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: true,
        }),
    ],
});

/*
Exports for our apps dispatch method
 */

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
