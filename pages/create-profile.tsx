/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
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
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { getErrorMessage, VALIDATION_RULES } from "@Utils/message";

type Inputs = {
    name: string;
    userName: string;
    phone: string;
    gender: string;
    address: string;
};

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const CreateProfile = (props: any) => {
    const { register, handleSubmit, watch, errors, reset, setValue } = useForm<
        Inputs
    >();

    const [state, setState] = useImmer({
        dataForm: {},
    });

    let _isMounted = true;

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

    const onSignUp = (data: any, e) => {
        setStateCommon({ dataForm: data });
        e.target.reset();
    };

    const onError = err => {
        console.log("onError ===>", err);
    };

    const { name, phone, userName, address, email } = errors;
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <WrapperSignIn className="wrapper-sign-in mb-4">
                        <TitleSignIn>Create Profile</TitleSignIn>
                        <form onSubmit={handleSubmit(onSignUp, onError)}>
                            <div className="mb-3">
                                <Input
                                    label="Name"
                                    type="text"
                                    returnName
                                    name="name"
                                    register={register({
                                        ...VALIDATION_RULES["name"],
                                    })}
                                    error={
                                        name?.type &&
                                        getErrorMessage(name?.type ?? "", "")
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="User name"
                                    returnName
                                    name="userName"
                                    register={register({
                                        ...VALIDATION_RULES["userName"],
                                    })}
                                    error={
                                        userName?.type &&
                                        getErrorMessage(
                                            userName?.type ?? "",
                                            ""
                                        )
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Email"
                                    returnName
                                    name="email"
                                    register={register({
                                        ...VALIDATION_RULES["email"],
                                    })}
                                    error={
                                        email?.type &&
                                        getErrorMessage(
                                            email?.type,
                                            "Email chưa hợp lệ"
                                        )
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Phone"
                                    returnName
                                    name="phone"
                                    register={register({
                                        ...VALIDATION_RULES["phone"],
                                    })}
                                    error={
                                        phone?.type &&
                                        getErrorMessage(
                                            phone?.type ?? "",
                                            "Số điện thoại phải từ 10 đến 11 ký tự."
                                        )
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <Input
                                    label="Address"
                                    returnName
                                    name="address"
                                    register={register({
                                        ...VALIDATION_RULES["address"],
                                    })}
                                    error={
                                        address?.type &&
                                        getErrorMessage(address?.type ?? "", "")
                                    }
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
                                    Create
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
