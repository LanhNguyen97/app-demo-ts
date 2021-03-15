/* eslint-disable react/default-props-match-prop-types */
import React, { ButtonHTMLAttributes } from "react";
import { StyleButton } from "./styled";

interface IStateButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: string;
    className?: string | "";
    rest?: any;
    children: any;
}

const Button: React.FC<IStateButton> = ({
    onClick,
    disabled,
    theme,
    className = "",
    children,
    ...rest
}) => {
    return (
        <StyleButton
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${theme} ${className}`}
            {...rest}
        >
            {children}
        </StyleButton>
    );
};

Button.defaultProps = {
    theme: "primary",
    disabled: false,
    className: "",
};

// Button.propTypes = {
//     theme: PropTypes.oneOf([
//         "success",
//         "danger",
//         "info",
//         "warning",
//         "primary",
//         "secondary",
//         "light",
//         "dark",
//     ]),
// };

export default Button;
