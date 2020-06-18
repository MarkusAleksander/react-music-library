import React from "react";

const Card = (props) => {
    const header_actions =
        props.header_actions && props.header_actions.length
            ? props.header_actions.map((action, idx) => {
                  return (
                      <div
                          key={idx}
                          className="card-header-icon"
                          aria-label={action.content}
                          onClick={action.onClick}
                      >
                          <span className="icon">{action.content}</span>
                      </div>
                  );
              })
            : null;

    return (
        <div className={["card", props.className].join(" ")}>
            {props.title ? (
                <div className="card-header">
                    <p className="card-header-title">{props.title}</p>
                    {header_actions ? <div>{header_actions}</div> : null}
                </div>
            ) : null}
            {props.image ? (
                <div className="card-image">{props.image}</div>
            ) : null}
            {props.content ? (
                <div className="card-content">{props.content}</div>
            ) : null}
            {props.footer ? (
                <div className="card-footer">{props.footer}</div>
            ) : null}
        </div>
    );
};

export default Card;
