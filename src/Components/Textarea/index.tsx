/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import { WrapperLabel, StyleTextarea } from "./styled";

const Textarea = (props: any) => {
    const {
        label,
        name,
        value,
        onChange,
        returnName,
        rows,
        cols,
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
                    <StyleTextarea
                        name={name}
                        value={value}
                        rows={rows}
                        cols={cols}
                        onChange={onChangeValue}
                        {...rest}
                    />
                </WrapperLabel>
            ) : (
                <StyleTextarea
                    name={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={onChangeValue}
                    {...rest}
                />
            )}
        </>
    );
};

Textarea.defaultProps = {
    returnName: false,
    onChange: () => {},
    rows: 5,
    cols: 100,
};

export default Textarea;
