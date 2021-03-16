/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Button from "@Components/Button";
import Input from "@Components/Input";
import { WrapperSignIn, TitleSignIn } from "@Styled/style.signIn";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

type Inputs = {
    name: string;
    userName: string;
    phone: string;
    gender: string;
    address: string;
};

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const CreateProfile = (props: any) => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();

    const [state, setState] = useImmer({
        name: "",
        userName: "",
        passWord: "",
        isLoading: false,
        message: "",
        isMatching: false,
        showError: false,
        dataForm: {},
    });
    let _isMounted = true;
    const router = useRouter();

    useEffect(() => {
        return () => {
            _isMounted = false;
        };
    }, []);

    const setStateCommon = (objects: {
        [x: string]: any;
        dataForm?: any;
        showError?: boolean;
    }) => {
        if (_isMounted) {
            Object.keys(objects).forEach(key => {
                setState(draft => {
                    draft[key] = objects[key];
                });
            });
        }
    };

    const onSignUp = (data: any) => {
        setStateCommon({ dataForm: data });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <WrapperSignIn className="wrapper-sign-in">
                        <TitleSignIn>Create Profile</TitleSignIn>
                        <form onSubmit={handleSubmit(onSignUp)}>
                            <div className="mb-3">
                                <Input
                                    label="Name"
                                    type="text"
                                    returnName
                                    name="name"
                                    register={register}
                                    // register={register({
                                    //     required: true,
                                    //     pattern: {
                                    //         value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                                    //         message: "Hello",
                                    //     },
                                    //     validate: {
                                    //         test1: value => value === "1",
                                    //     },
                                    // })}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="User name"
                                    returnName
                                    name="userName"
                                    register={register}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Email"
                                    returnName
                                    name="email"
                                    register={register({
                                        // pattern: {
                                        //     value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                                        // },
                                        validate: {
                                            isNotEmail: value =>
                                                !!value.match(
                                                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                                                ),
                                        },
                                    })}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Phone"
                                    returnName
                                    name="phone"
                                    register={register}
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Address"
                                    returnName
                                    name="address"
                                    register={register}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="mr-3">Gender</label>
                                <select name="gender" ref={register}>
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="mr-3">Matrimony</label>
                                <select name="matrimony" ref={register}>
                                    <option value="alone">Alone</option>
                                    <option value="isMarried">isMarried</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                {Object.keys(state.dataForm).length > 0 ? (
                                    <DynamicReactJson src={state.dataForm} />
                                ) : null}
                            </div>
                            <div>
                                <Button
                                    theme="success"
                                    className="w-100"
                                    type="submit"
                                >
                                    {state.isLoading ? "Loading..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </WrapperSignIn>
                </div>
            </div>
        </div>
    );
};
export default CreateProfile;
