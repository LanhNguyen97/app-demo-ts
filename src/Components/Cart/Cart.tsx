/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
import React from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { addToCart, removeFromCart, removeWholeItem } from "@Actions";

import { Modal } from "react-bootstrap";
import CartItem from "./CartItem";

const Cart: React.FC<any> = props => {
    const { isShow, cart } = props;
    const router = useRouter();
    const lengthCart = cart.length;

    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice += parseInt(item.price) * parseInt(item.quantity);
    });

    const onClose = () => {
        props.onClose();
    };

    const onClick = () => {
        props.onClose();
        router.push("/checkout");
    };

    return (
        <Modal show={isShow} onHide={onClose} dialogClassName="popup-cart">
            <Modal.Header closeButton>
                <Modal.Title>Shopping cart</Modal.Title>
                <span className="total-quantity">
                    <span className="total">{lengthCart} </span>
                    product(s)
                </span>
            </Modal.Header>
            <Modal.Body>
                {(cart && cart.length === 0) || cart.size === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "150px" }}>
                        Empty cart, press <a href="/">here</a> to continue
                        shopping
                    </p>
                ) : (
                    cart.map((product: any, index: number) => {
                        return (
                            <CartItem
                                key={index.toString()}
                                name={product.name}
                                image={product.linkImage}
                                price={product.price}
                                quantity={product.quantity}
                                addItem={() => props.addToCart(product)}
                                removeItem={() => props.removeFromCart(product)}
                                removeWholeItem={() =>
                                    props.removeWholeItem(product)
                                }
                                totalQuantity={product.totalQuantity}
                                productID={product.productId}
                            />
                        );
                    })
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="div-total">
                    <div className="label-total">Total:</div>
                    <div className="text-total-right">
                        <NumberFormat
                            value={totalPrice}
                            displayType="text"
                            thousandSeparator
                            renderText={value => (
                                <span className="total-price">{value}₫</span>
                            )}
                        />
                    </div>
                </div>
                <div className="div-checkout">
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={onClick}
                    >
                        <a>Checkout</a>
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
    };
};

Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    // removeFromCart: PropTypes.func.isRequired,
    onClose: PropTypes.func,
};

export default connect(mapStateToProps, {
    addToCart,
    removeFromCart,
    removeWholeItem,
    // toggleModalCart,
})(Cart);
