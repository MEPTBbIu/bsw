import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
const middlewares = applyMiddleware(thunk);
const configureStore = (initialState) => createStore(rootReducer, initialState, compose(middlewares));
export default configureStore;
//# sourceMappingURL=E:/.prj/lo/BSWClientApp/dist/src/core/store/configureStore.prod.js.map