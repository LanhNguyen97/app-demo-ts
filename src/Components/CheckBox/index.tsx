/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";

const Checkbox = props => {
    const { checked, name, label } = props;

    const onChange = () => {
        props.onChange(props.name);
    };
    return (
        <div>
            <input
                type="checkbox"
                checked={checked}
                name={name}
                onChange={onChange}
            />
            <label className="ml-2">{label}</label>
        </div>
    );
};

export default Checkbox;
