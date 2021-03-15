/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-shadow */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { WrapperLabel, StyleInput, TextError } from "./styled";

const Input = (props: any) => {
    const {
        label,
        name,
        value,
        onChange,
        type,
        returnName,
        error,
        iconClick,
        showIcon,
        register,
        ...rest
    } = props;

    const onChangeValue = (e: any) => {
        const valueInput = e.target.value;

        if (returnName) {
            onChange(name, valueInput);
        } else {
            onChange(valueInput);
        }
    };

    return (
        <>
            {label ? (
                <WrapperLabel>
                    <label>{label}</label>
                    <StyleInput
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChangeValue}
                        ref={register}
                        {...rest}
                    />
                    {showIcon && (
                        <FontAwesomeIcon icon={faEye} onClick={iconClick} />
                    )}
                    {error && <TextError>{error}</TextError>}
                </WrapperLabel>
            ) : (
                <>
                    <StyleInput
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChangeValue}
                        ref={register}
                        {...rest}
                    />
                    {error && <TextError>{error}</TextError>}
                </>
            )}
        </>
    );
};

Input.defaultProps = {
    returnName: false,
    onChange: () => {},
    type: "text",
    showIcon: false,
};

export default Input;
