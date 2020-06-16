import React from "react";

const Button = (props) => (
    <button
        className={["button", props.className, props.type].join(" ")}
        onClick={props.onclick}
    >
        {props.text}
    </button>
);

export default Button;
