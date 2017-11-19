import { StoreEnhancerStoreCreator, applyMiddleware, compose, createStore } from "redux";

import {AppStore}  from "./store";
//import { initialState } from "./../reducers/initialState";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const middlewares: ( next: StoreEnhancerStoreCreator<AppStore.All> ) => StoreEnhancerStoreCreator<AppStore.All> =
	applyMiddleware(thunk);

const configureStore = ( initialState: AppStore.All ) => createStore<AppStore.All>(
	rootReducer,
	initialState,
	compose(middlewares)
);

export default configureStore;
