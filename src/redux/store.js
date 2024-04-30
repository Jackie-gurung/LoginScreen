import { legacy_createStore as createStore, combineReducers, applyMiddleware,compose } from "redux";
import axios from "axios";

import authReducer from "./reducer/authReducer";
import { createLogicMiddleware } from "redux-logic";

import Logic from './logic'

const rootReducer = combineReducers({
    auth: authReducer
})

// const deps = {
//     httpClient: axios
// };

// const logicMiddleware = createLogicMiddleware(Logic,deps)
const logicMiddleware = createLogicMiddleware(Logic)

const composedMiddleware = compose(applyMiddleware(logicMiddleware))

const store = createStore(
    rootReducer,
    composedMiddleware
);

export default store;
