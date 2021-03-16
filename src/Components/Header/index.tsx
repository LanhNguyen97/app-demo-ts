/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { init, clearInfoUser } from "@Actions";
import { removeCookie } from "@Utils/cookies";

import {
    ContainerNav,
    WrapperNav,
    WrapperItemNav,
    Flex,
    WrapperIcon,
    WrapperAvatar,
} from "./styled";
import ModalCart from "../Cart/Cart";
import NavMobile from "./NavMobile";

const Pointer = { cursor: "pointer" };
const StyleBars = { ...Pointer, color: "#fff" };

const Header = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pathname } = router;
    const { cart, user } = props;
    const [isShow, setIsShow] = useState(false);
    const [isShowNav, setIsShowNav] = useState(false);

    const toggleModal = () => {
        setIsShow(!isShow);
    };

    const toggleNav = () => {
        setIsShowNav(!isShowNav);
    };

    useEffect(() => {
        dispatch(init());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLogout = () => {
        removeCookie("token");
        dispatch(clearInfoUser());
        window.location.href = window.location.href;
    };

    const onRedirectProfile = () => {
        router.push("/profile");
    };

    return (
        <ContainerNav>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Flex>
                            <NavMobile
                                isShowNav={isShowNav}
                                onToggle={toggleNav}
                            />
                            <div className="d-block d-md-none">
                                <FontAwesomeIcon
                                    icon={faBars}
                                    onClick={toggleNav}
                                    style={StyleBars}
                                />
                            </div>
                            <WrapperNav className="d-none d-md-flex">
                                <WrapperItemNav>
                                    <Link href="/">
                                        <a
                                            className={
                                                pathname === "/"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Home
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                                <WrapperItemNav>
                                    <Link href="/sign-in" as="/sign-in">
                                        <a
                                            className={
                                                pathname === "/sign-in"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Sign In
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                                <WrapperItemNav>
                                    <Link href="/sign-up" as="/sign-up">
                                        <a
                                            className={
                                                pathname === "/sign-up"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Sign Up
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                                <WrapperItemNav>
                                    <Link href="/categories" as="/categories">
                                        <a
                                            className={
                                                pathname === "/categories"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Categories
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                                <WrapperItemNav>
                                    <Link href="/checkout" as="/checkout">
                                        <a
                                            className={
                                                pathname === "/checkout"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Checkout
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                                <WrapperItemNav>
                                    <Link
                                        href="/create-profile"
                                        as="/create-profile"
                                    >
                                        <a
                                            className={
                                                pathname === "/create-profile"
                                                    ? "nav-active"
                                                    : ""
                                            }
                                        >
                                            Create Profile
                                        </a>
                                    </Link>
                                </WrapperItemNav>
                            </WrapperNav>
                            <Flex>
                                <WrapperIcon
                                    hasUser={Object.keys(user).length > 0}
                                >
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        onClick={toggleModal}
                                        style={Pointer}
                                    />
                                    <span className="total">
                                        {cart.length || 0}
                                    </span>
                                </WrapperIcon>
                                {Object.keys(user).length > 0 ? (
                                    <WrapperAvatar className="avatar-user">
                                        <img
                                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRuB6Ziv2XV4n9JvDLNj4jLZjS3_Wm1mWCMw&usqp=CAU`}
                                            loading="lazy"
                                        />
                                        <div className="menu">
                                            <div
                                                className="profile"
                                                onClick={onRedirectProfile}
                                            >
                                                Profile
                                            </div>
                                            <div
                                                className="logout"
                                                onClick={onLogout}
                                            >
                                                Log out
                                            </div>
                                        </div>
                                    </WrapperAvatar>
                                ) : null}
                            </Flex>
                        </Flex>
                        <ModalCart isShow={isShow} onClose={toggleModal} />
                    </div>
                </div>
            </div>
        </ContainerNav>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(Header);
