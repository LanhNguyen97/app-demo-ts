import { ActionConsts } from "@Definitions";

export const addToCart = (product: any) => {
    return {
        type: ActionConsts.Cart.ADD_TO_CART,
        payload: product,
    };
};

export const init = () => {
    return {
        type: ActionConsts.Cart.INIT,
    };
};

export const removeFromCart = (product: any) => ({
    type: ActionConsts.Cart.REMOVE_FROM_CART,
    payload: product,
});

export const removeWholeItem = (product: any) => ({
    type: ActionConsts.Cart.REMOVE_WHOLE_ITEM,
    payload: product,
});

export const clearAllCart = () => ({
    type: ActionConsts.Cart.CLEAR_ALL_CART,
});
