/* eslint-disable react/default-props-match-prop-types */
import React from "react";
import PropTypes from "prop-types";

const Alert: React.FC<any> = props => {
    const { className, onClose, showClose, message } = props;
    return (
        <div className={`alert alert-${className} alert-dismissible`}>
            {showClose && (
                <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    onClick={onClose}
                >
                    &times;
                </button>
            )}
            {message}
        </div>
    );
};

Alert.defaultProps = {
    className: "success",
    showClose: true,
    message: "",
    onClose: () => {},
};

Alert.propTypes = {
    className: PropTypes.oneOf([
        "success",
        "danger",
        "info",
        "warning",
        "primary",
        "secondary",
        "light",
        "dark",
    ]),
};

export default Alert;
