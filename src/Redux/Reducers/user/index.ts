import { ActionConsts } from "@Definitions";
import { IAction } from "@Interfaces";

const initialState = {};

const userReducer = (state = initialState, action: IAction<{}>) => {
    switch (action.type) {
        case ActionConsts.User.INIT_INFO:
            return { ...action.payload };
        case ActionConsts.User.AUTHENTICATE_USER:
            return state;
        case ActionConsts.User.GET_INFO_DONE:
            return { ...action.payload };
        case ActionConsts.User.CLEAR_INFO_USER:
            return {};
        default:
            return state;
    }
};

export default userReducer;
