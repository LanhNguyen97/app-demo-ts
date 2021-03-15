/* eslint-disable no-console */
/* eslint-disable radix */
import { Dispatch } from "redux";

import { callApi } from "@Utils/callApi";
import { getCookie } from "@Utils/cookies";
import { verifyToken } from "@Utils/token";
import { ActionConsts } from "@Definitions";

export const initInfo = (user: any) => {
    return {
        type: ActionConsts.User.INIT_INFO,
        payload: user,
    };
};

const checkUser = async () => {
    const token = getCookie("token");

    if (token) {
        const decode = verifyToken(token);
        const { userId, exp } = decode;

        if (userId && parseInt(exp) >= Date.now() / 1000) {
            const res = await callApi(
                `https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/user/${userId}`
            );

            if (res) {
                return res.data;
            }
        }
    }

    return {};
};

export const authenticateUser = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionConsts.User.AUTHENTICATE_USER,
            payload: {},
        });

        return checkUser()
            .then(res => {
                dispatch({
                    type: ActionConsts.User.GET_INFO_DONE,
                    payload: res,
                });
            })
            .catch(err => {
                console.log("err ===>", err);
                dispatch({
                    type: ActionConsts.User.GET_INFO_DONE,
                    payload: {},
                });
            });
    };
};

export const clearInfoUser = () => {
    return {
        type: ActionConsts.User.CLEAR_INFO_USER,
    };
};
