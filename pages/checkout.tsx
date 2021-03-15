/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Link from "next/link";
import { useDispatch, connect } from "react-redux";
import { useRouter } from "next/router";

import {
    DivFormCheckout,
    DivTitle,
    DivSubmit,
    DivBodyProducts,
    DivRow,
} from "@Styled/style.checkout";
import Input from "@Components/Input";
import CartItem from "@Components/Cart/CartItem";
import {
    addToCart,
    clearAllCart,
    removeFromCart,
    removeWholeItem,
} from "@Actions";
import { useImmer } from "use-immer";
import Textarea from "@Components/Textarea";
import ModalInformOrder from "@Components/Modal/ModalInformOrder";
import withAuth from "@Components/Auth";

const initialState = () => ({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    email: "",
    isShowModal: false,
});

const Checkout = (props: any) => {
    const { cart, user = {} } = props;
    let _isMounted = true;
    const router = useRouter();

    const dispatch = useDispatch();
    const [state, setState] = useImmer(initialState());

    const setStateCommon = (objects: any) => {
        if (_isMounted) {
            Object.keys(objects).forEach(key => {
                setState(draft => {
                    draft[key] = objects[key];
                });
            });
        }
    };

    useEffect(() => {
        return () => {
            _isMounted = false;
        };
    }, []);

    const onChangeCommon = (name: any, value: any) => {
        setStateCommon({ [name]: value });
    };

    let totalPrice = 0;

    cart.forEach((item: { price: string; quantity: string }) => {
        totalPrice += parseInt(item.price) * parseInt(item.quantity);
    });

    const onOrder = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setStateCommon({ isShowModal: true });
    };

    const onCancel = () => {
        setStateCommon({ isShowModal: false });
        dispatch(clearAllCart());
        setState(() => initialState());
    };

    const onContinue = () => {
        setStateCommon({ isShowModal: false });
        dispatch(clearAllCart());
        router.push("/");
    };

    return (
        <div className="container container-general">
            <DivRow className="row m-0">
                <div className="col-lg-8 mt-4 mb-4">
                    <Link href="/">
                        <a>
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                style={{ marginRight: "5px" }}
                            />
                            Buy more products
                        </a>
                    </Link>
                    <DivTitle className="your-cart mx-auto">
                        Order information
                    </DivTitle>
                    <DivFormCheckout>
                        <form
                            autoComplete="off"
                            style={{ margin: "30px" }}
                            onSubmit={onOrder}
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Input
                                        label="FullName"
                                        returnName
                                        name="fullName"
                                        onChange={onChangeCommon}
                                        className="form-control"
                                        value={user.name || state.fullName}
                                        // autoComplete="off"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <Input
                                        label="Phone (*)"
                                        returnName
                                        name="phone"
                                        onChange={onChangeCommon}
                                        className="form-control"
                                        value={state.phone}
                                        // autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <Input
                                    label="Email"
                                    returnName
                                    type="email"
                                    name="email"
                                    onChange={onChangeCommon}
                                    className="form-control"
                                    value={state.email}
                                    // autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    label="Address (*)"
                                    returnName
                                    type="text"
                                    name="address"
                                    onChange={onChangeCommon}
                                    className="form-control"
                                    value={state.address}
                                    // autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Note</label>
                                <Textarea
                                    rows="5"
                                    type="text"
                                    className="form-control"
                                    name="note"
                                    value={state.note}
                                    onChange={onChangeCommon}
                                />
                            </div>
                            <div className="form-group text-right">
                                (*) required
                            </div>
                            <DivSubmit className="button-submit w-100 mx-auto">
                                <button
                                    type="submit"
                                    className="mx-auto btn btn-primary btn-block w-50"
                                    disabled={
                                        state.phone.length === 0 ||
                                        state.address.length === 0 ||
                                        cart.length === 0
                                    }
                                >
                                    Order
                                </button>
                                {/* {this.state.message !== "" && (
                  <Alert
                    show={this.state.isShow}
                    variant={this.state.variant}
                    onClose={() => this.setState({ isShow: false })}
                    style={{ margin: "0" }}
                    dismissible
                  >
                    <p style={{ margin: "0" }}>{this.state.message}</p>
                  </Alert>
                )} */}
                            </DivSubmit>
                            <div id="checkout-paypal"></div>
                        </form>
                    </DivFormCheckout>
                </div>
                <div className="col-lg-4 mt-4 mb-4">
                    <DivTitle
                        className="your-cart mx-auto"
                        style={{ fontSize: "20px" }}
                    >
                        List products
                    </DivTitle>
                    <span className="total-quantity">
                        <span className="total">
                            {cart.length === 0 || cart.size === 0
                                ? 0
                                : cart.length}{" "}
                        </span>
                        product(s)
                    </span>
                    <DivBodyProducts className="body-products">
                        {(cart && cart.length === 0) || cart.size === 0 ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: "150px",
                                }}
                            >
                                Empty cart, press{" "}
                                {/* <Link href="/home" as="/"> */}
                                <a href="/">here</a>
                                {/* </Link>{" "} */}
                                to continue shopping
                            </p>
                        ) : (
                            cart.map(
                                (
                                    product: {
                                        name: string;
                                        productId: string | number;
                                        linkImage: string;
                                        price: string | number;
                                        quantity: number;
                                        totalQuantity: number;
                                    },
                                    index: React.Key | null | undefined
                                ) => {
                                    return (
                                        <CartItem
                                            key={index?.toString()}
                                            name={product.name}
                                            productID={product.productId}
                                            image={product.linkImage}
                                            price={product.price}
                                            quantity={product.quantity}
                                            addItem={() =>
                                                dispatch(addToCart(product))
                                            }
                                            removeItem={() =>
                                                dispatch(
                                                    removeFromCart(product)
                                                )
                                            }
                                            removeWholeItem={() =>
                                                dispatch(
                                                    removeWholeItem(product)
                                                )
                                            }
                                            totalQuantity={
                                                product.totalQuantity
                                            }
                                        />
                                    );
                                }
                            )
                        )}
                    </DivBodyProducts>
                    <div className="div-total">
                        <div className="label-total">Total:</div>
                        <div className="text-total-right">
                            <NumberFormat
                                value={totalPrice}
                                displayType="text"
                                thousandSeparator
                                renderText={value => (
                                    <span className="total-price">
                                        {value}₫
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </DivRow>
            <ModalInformOrder
                isShow={state.isShowModal}
                onContinue={onContinue}
                onCancel={onCancel}
            />
        </div>
    );
};

const mapStateToProps = (state: { cart: { cart: any }; user: any }) => {
    return {
        cart: state.cart.cart,
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(withAuth(Checkout));
