import React from "react";

const input = (props) => (
    <input type={props.type} onChange={props.onchange} value={props.value} />
);

export default input;
