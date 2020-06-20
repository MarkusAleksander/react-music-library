import React from "react";

const Button = (props) => (
    <button
        className={["button", props.className, props.status].join(" ")}
        onClick={props.onClick}
    >
        {props.content}
    </button>
);

export default Button;
