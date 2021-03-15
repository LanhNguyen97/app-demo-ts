/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import NumberFormat from "react-number-format";

interface ICartItem {
    name: string;
    image: string;
    price: string | number;
    quantity: number;
    addItem: any;
    removeItem: any;
    removeWholeItem: any;
    productID: string | number;
    totalQuantity: number;
}

const CartItem: React.FC<ICartItem> = ({
    name,
    image,
    price,
    quantity,
    addItem,
    removeItem,
    removeWholeItem,
    productID,
    totalQuantity,
}) => {
    return (
        <div className="cart-item">
            <a className="cart-image">
                <img src={image} alt={name} />
            </a>
            <div className="cart-info">
                <div className="title-product">
                    <a href={`/product/${productID}`}>{name}</a>
                </div>
                <div className="row-cart">
                    <div className="cart-quantity">
                        <div className="edit-quantity">
                            <label className="title-quantity">Quantity</label>
                            <div className="cart-select">
                                <div
                                    className="input-group-btn"
                                    style={{ display: "inline-flex" }}
                                >
                                    <button
                                        className="btn btn-default btn-minus"
                                        onClick={removeItem}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <span className="input-quantity">
                                        {quantity}{" "}
                                    </span>
                                    <button
                                        className={`btn btn-default btn-plus ${
                                            totalQuantity - quantity <= 0
                                                ? "disable-button-increase"
                                                : ""
                                        }`}
                                        onClick={addItem}
                                        type="button"
                                        disabled={totalQuantity - quantity <= 0}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="edit-quantity ml-3">
                            <label className="title-quantity mb-2">
                                {totalQuantity - quantity !== 0
                                    ? "Remaining"
                                    : " "}
                            </label>
                            <label className="title-quantity">{`${
                                totalQuantity - quantity === 0
                                    ? "Sold out"
                                    : `${totalQuantity - quantity} product(s)`
                            }`}</label>
                        </div>
                    </div>
                    <div className="div-price">
                        <div className="text-price">
                            <NumberFormat
                                value={price}
                                displayType="text"
                                thousandSeparator
                                renderText={value => (
                                    <span className="price-product">
                                        {value}₫/1item
                                    </span>
                                )}
                            />
                        </div>
                        <a className="remove-product" onClick={removeWholeItem}>
                            Remove this product
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
