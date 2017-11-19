import rootReducer from "../reducers";
import initialStateData from "../reducers/initialState";
import { applyMiddleware, compose, createStore } from "redux";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
const logger = createLogger();
const devExtension = window.devToolsExtension;
const middlewares = applyMiddleware(thunk, immutableStateInvariantMiddleware(), logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = (initialState = initialStateData) => createStore(rootReducer, initialStateData, composeEnhancers(middlewares));
export default configureStore;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/store/configureStore.dev.js.map