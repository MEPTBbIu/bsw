import rootReducer from "../reducers";
import initialStateData from "../reducers/initialState";
import { RootState } from "../store";
import {
	applyMiddleware,
	compose,
	createStore,
	StoreEnhancerStoreCreator
	} from "redux";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger();

const devExtension = (window as any).devToolsExtension;

const middlewares: ( next: StoreEnhancerStoreCreator<RootState> ) => StoreEnhancerStoreCreator<RootState> =
	applyMiddleware(thunk, immutableStateInvariantMiddleware(), logger);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = ( initialState: RootState = initialStateData) =>
	 createStore<RootState>(
		 rootReducer,
		 initialStateData, /* preloadedState, */
		 composeEnhancers(middlewares	)//, devExtension ? devExtension() : f => f
		);

export default configureStore;

