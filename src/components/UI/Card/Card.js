import React from "react";

const Card = (props) => (
    <div className={["card", ...props.className].join(" ")}>
        <div className="card__header">{props.header}</div>
        <div className="card__body">{props.body}</div>
        <div className="card__footer">{props.footer}</div>
    </div>
);

export default Card;
