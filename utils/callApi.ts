/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import axios, { Method } from "axios";

export const callApi = (endPoint: string, method?: Method, dataPost?: any) => {
    return axios({
        method,
        url: endPoint,
        data: dataPost,
    }).catch(err => {
        console.log("err ===>", err);
    });
};
