// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { HomeReducer } from "./home";
import CartReducer from "./cart";
import UserReducer from "./user";
// #endregion Local Imports

export default combineReducers({
    home: HomeReducer,
    cart: CartReducer,
    user: UserReducer,
});
