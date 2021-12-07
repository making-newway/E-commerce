import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { authReducer, userReducer } from "./Reducer/auth-reducers";
import { catReducer } from "./Reducer/category-reducer";
import { prodReducer } from "./Reducer/product-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: catReducer,
    product: prodReducer
})


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;