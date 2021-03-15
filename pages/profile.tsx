/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import withAuth from "@Components/Auth";
import { ContainerProfile, Title } from "@Styled/style.profile";
import Input from "@Components/Input";
import { useImmer } from "use-immer";
import Button from "@Components/Button";
import { connect } from "react-redux";
import { callApi } from "@Utils/callApi";
import Alert from "@Components/Alert";

const Profile = props => {
    const { user = {} } = props;
    const [state, setState] = useImmer({
        name: "",
        userName: "",
        password: "",
        isLoading: false,
        message: "",
        showAlert: false,
        isSuccess: false,
        isDisabled: true,
        showPass: false,
        disabledButtonSave: true,
    });

    let _isMounted = true;

    useEffect(() => {
        return () => {
            _isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (typeof user === "object" && Object.keys(user).length > 0) {
            setStateCommon({
                name: user.name,
                userName: user.userName,
                password: user.passWord,
            });
        }
    }, [user]);

    const setStateCommon = objects => {
        if (_isMounted) {
            Object.keys(objects).forEach(key => {
                setState(draft => {
                    draft[key] = objects[key];
                });
            });
        }
    };

    const onChangeCommon = (name, value) => {
        setStateCommon({ [name]: value, disabledButtonSave: false });
    };

    const onClose = () => {
        setStateCommon({ showAlert: false });
    };

    const onEdit = () => {
        setStateCommon({ isDisabled: false });
    };

    const onCancel = () => {
        setStateCommon({
            isDisabled: true,
            name: user.name,
            userName: user.userName,
            password: user.passWord,
        });
    };

    const onSave = () => {
        setStateCommon({ isDisabled: true, isLoading: true });

        const dataPost = {
            name: state.name,
            password: state.password,
        };

        callApi(
            `https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/user/${user.userId}`,
            "put",
            dataPost
        )
            .then(res => {
                setStateCommon({
                    showAlert: true,
                    message: "Success",
                    isSuccess: true,
                });
            })
            .catch(err => {
                console.log("err ===>", err);
                setStateCommon({
                    showAlert: true,
                    message: "err",
                    isSuccess: false,
                });
            });
    };

    const onShowPass = () => {
        setStateCommon({ showPass: !state.showPass });
    };

    return (
        <ContainerProfile className="container">
            <div className="row">
                <div className="col-12">
                    <Title>Profile</Title>
                    <div className="row">
                        <div className="col-md-2 custom-css-profile">
                            <img
                                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAU9KXPynTtqeWYLQlJ9CRVULXthc2yNlRw&usqp=CAU`}
                                loading="lazy"
                            />
                        </div>
                        <div className="col-md-10">
                            <div className="mb-3">
                                <Input
                                    label="Name"
                                    onChange={onChangeCommon}
                                    returnName
                                    name="name"
                                    disabled={state.isDisabled}
                                    value={state.name}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="User name"
                                    // onChange={onChangeCommon}
                                    returnName
                                    name="userName"
                                    disabled
                                    value={state.userName}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    type={state.showPass ? "text" : "password"}
                                    label="Password"
                                    onChange={onChangeCommon}
                                    returnName
                                    name="password"
                                    value={state.password}
                                    disabled={state.isDisabled}
                                    showIcon
                                    iconClick={onShowPass}
                                />
                            </div>
                            {state.showAlert && (
                                <Alert
                                    showClose
                                    message={state.message}
                                    className={
                                        state.isSuccess ? "success" : "danger"
                                    }
                                    onClose={onClose}
                                />
                            )}
                            <div className="mt-3">
                                {state.isDisabled ? (
                                    <Button theme="primary" onClick={onEdit}>
                                        Edit
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            disabled={state.disabledButtonSave}
                                            theme="success"
                                            className="mr-2"
                                            onClick={onSave}
                                        >
                                            {state.isLoading
                                                ? "Loading..."
                                                : "Save"}
                                        </Button>
                                        <Button
                                            theme="primary"
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerProfile>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, null)(withAuth(Profile));
