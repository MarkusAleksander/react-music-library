import React from "react";

const input = (props) => {

    const onKeyChange = (e) => {
        if (e.key === "Enter") {
            props.onSubmit && props.onSubmit();
            return;
        }
        // props.onChange(e.key);
    };

    return (
        <div className="field">
            {props.label ? <label className="label">{props.label}</label> : null}
            <div className="control">
                <input
                    className="input"
                    type={props.type}
                    onChange={props.onChange}
                    onKeyDown={onKeyChange}
                    value={props.value}
                />
            </div>
        </div>
    )
};

export default input;
