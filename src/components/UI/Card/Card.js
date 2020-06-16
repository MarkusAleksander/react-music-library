import React from "react";

const Card = (props) => (
    <div className={["card", props.className].join(" ")}>
        {props.title ? (
            <div className="card-header">
                <p className="card-header-title">{props.title}</p>
                <div
                    className="card-header-icon"
                    aria-label="save"
                    onClick={props.onHeaderIconClick}
                >
                    <span className="icon">Save</span>
                </div>
            </div>
        ) : null}
        {props.image ? <div className="card-image">{props.image}</div> : null}
        {props.content ? (
            <div className="card-content">{props.content}</div>
        ) : null}
        {props.footer ? (
            <div className="card-footer">{props.footer}</div>
        ) : null}
    </div>
);

export default Card;
