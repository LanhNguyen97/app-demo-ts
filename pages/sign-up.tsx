/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Button from "@Components/Button";
import Input from "@Components/Input";
import Alert from "@Components/Alert";
import { WrapperSignIn, TitleSignIn } from "@Styled/style.signIn";
import { callApi } from "@Utils/callApi";
import { generateToken } from "@Utils/token";
import { setCookie } from "@Utils/cookies";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type Inputs = {
    name: string;
    userName: string;
    passWord: string;
};

const SignUp = (props: any) => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const [state, setState] = useImmer({
        name: "",
        userName: "",
        passWord: "",
        isLoading: false,
        message: "",
        isMatching: false,
        showError: false,
    });
    let _isMounted = true;
    const router = useRouter();

    useEffect(() => {
        return () => {
            _isMounted = false;
        };
    }, []);

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
        setStateCommon({ [name]: value });
    };

    const onCheckInfoSignUp = async () => {
        const dataPost = {
            name: state.name,
            userName: state.userName,
            passWord: state.passWord,
        };
        const res = await callApi(
            "https://5e1fc92ee31c6e0014c6000e.mockapi.io/api/user",
            "post",
            dataPost
        );

        if (res) {
            if (res.status === 201) {
                // dispatch(initInfo(res.data))

                const token = generateToken({ userId: res.data.userId });

                if (token) {
                    setCookie("token", token);
                }

                setStateCommon({
                    showError: true,
                    message: "Success.",
                    isLoading: false,
                    isMatching: true,
                    name: "",
                    userName: "",
                    passWord: "",
                });

                router.push("/");
            }
        }
    };

    const onSignUp = data => {
        setStateCommon({ isLoading: true });
        console.log("data ===>", data);
        // onCheckInfoSignUp();
    };

    const onClose = () => {
        setStateCommon({ showError: false });
    };
    console.log("props ===>", errors);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <WrapperSignIn className="wrapper-sign-in">
                        <TitleSignIn>Sign Up</TitleSignIn>
                        <form onSubmit={handleSubmit(onSignUp)}>
                            <div className="mb-3">
                                <Input
                                    // value={state.name}
                                    label="Name"
                                    type="text"
                                    returnName
                                    name="name"
                                    // onChange={onChangeCommon}
                                    register={register({
                                        required: true,
                                        pattern: {
                                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                                            message: "Hello",
                                        },
                                        validate: {
                                            test1: value => value === "1",
                                        },
                                    })}
                                />
                                {/* <input
                                    label="Name"
                                    type="text"
                                    // returnName
                                    name="name"
                                    // onChange={onChangeCommon}
                                                                        register={register}

                                /> */}
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="User name"
                                    // value={state.userName}
                                    returnName
                                    name="userName"
                                    // onChange={onChangeCommon}
                                    register={register}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Password"
                                    type="password"
                                    returnName
                                    // value={state.passWord}
                                    name="passWord"
                                    // onChange={onChangeCommon}
                                    register={register}
                                />
                            </div>
                            {state.showError && (
                                <Alert
                                    showClose
                                    message={state.message}
                                    className={
                                        state.isMatching ? "success" : "danger"
                                    }
                                    onClose={onClose}
                                />
                            )}
                            <div>
                                <Button
                                    // onClick={handleSubmit(onSignUp)}
                                    theme="success"
                                    className="w-100"
                                    type="submit"
                                    // disabled={
                                    //     state.userName.length === 0 ||
                                    //     state.passWord.length === 0
                                    // }
                                >
                                    {state.isLoading ? "Loading..." : "Sign up"}
                                </Button>
                            </div>
                        </form>
                    </WrapperSignIn>
                </div>
            </div>
        </div>
    );
};
export default SignUp;
