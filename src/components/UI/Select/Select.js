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
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <select
                    className="select"
                    value={props.selected}
                    onChange={props.onchange}
                >
                    {options}
                </select>
            </div>
        </div>
    );
};

export default Select;
