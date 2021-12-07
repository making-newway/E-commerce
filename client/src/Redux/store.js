import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer, userReducer } from "./Reducer/auth-reducers";
import { catReducer } from "./Reducer/category-reducer";
import { prodReducer } from "./Reducer/product-reducer";
import logger from "redux-logger";

const rootReducer = combineReducers({
    category: catReducer,
    product: prodReducer
})


const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;