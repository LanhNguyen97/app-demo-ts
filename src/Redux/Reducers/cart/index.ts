/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { ActionConsts } from "@Definitions";
import { IAction } from "@Interfaces";

interface IState {
    cart: [];
}

const initialState = {
    cart: [],
};

const itemInCart = (cart: any, item: any) => {
    let index = -1;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productId == item.productId) {
                index = i;
                break;
            }
        }
    }
    return index;
};

const decreaseItem = (cart: any, index: any) => {
    cart[index].quantity -= 1;
    return cart;
};

const removeItem = (cart: any, index: any) => {
    cart.splice(index, 1);

    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return cart;
};

const removeFromCart = (cart: any, item: any) => {
    const indexItem = itemInCart(cart, item);
    const data =
        item.quantity === 1
            ? [...removeItem(cart, indexItem)]
            : [...decreaseItem(cart, indexItem)];

    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(data));
    }

    return data;
};

const removeWholeItem = (cart: any, item: any) => {
    const indexItem = itemInCart(cart, item);
    const data = [...removeItem(cart, indexItem)];

    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(data));
    }

    return data;
};

const addToCart = (state: any, product: any) => {
    const cloneState = JSON.parse(JSON.stringify(state));
    const { cart } = cloneState;

    if (cart.length > 0) {
        let isExisted = false;

        cart.forEach((item: any) => {
            if (item.productId == product.productId) {
                item.quantity += 1;
                isExisted = true;
            }
        });

        if (!isExisted) {
            const cloneProduct = JSON.parse(JSON.stringify(product));
            cloneProduct.quantity = 1;
            cart.push(cloneProduct);
        }
    } else {
        const cloneProduct = JSON.parse(JSON.stringify(product));
        cloneProduct.quantity = 1;
        cart.push(cloneProduct);
    }

    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return cart;
};

const cartReducer = (state = initialState, action: IAction<{}>) => {
    switch (action.type) {
        case ActionConsts.Cart.INIT:
            if (typeof window !== "undefined") {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                state.cart = cart;
                return { ...state };
            }
            break;
        case ActionConsts.Cart.ADD_TO_CART:
            const cart = addToCart(state, action.payload);
            return { cart };
        case ActionConsts.Cart.REMOVE_FROM_CART:
            return {
                ...state,
                cart: removeFromCart(state.cart, action.payload),
            };
        case ActionConsts.Cart.REMOVE_WHOLE_ITEM:
            return {
                ...state,
                cart: removeWholeItem(state.cart, action.payload),
            };
        case ActionConsts.Cart.CLEAR_ALL_CART:
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            return { cart: [] };
        default:
            return state;
    }
};

export default cartReducer;
