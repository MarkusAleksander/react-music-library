import React from "react";

const Select = (props) => {
    const options = props.options.map((option) => {
        return (
            <option key={option.value} value={option.value}>
                {option.text}
            </option>
        );
    });

    return (
        <select value={props.selected} onChange={props.onchange}>
            {options}
        </select>
    );
};

export default Select;
