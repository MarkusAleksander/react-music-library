import React from "react";

const input = (props) => (
    <div className="field">
        {props.label ? <label className="label">{props.label}</label> : null}
        <div className="control">
            <input
                className="input"
                type={props.type}
                onChange={props.onchange}
                value={props.value}
            />
        </div>
    </div>
);

export default input;
