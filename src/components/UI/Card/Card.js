import React from "react";
import Auxillary from "./../../../hoc/Auxillary";
import Button from "./../Button/Button";

const Card = (props) => {
    const header_actions =
        props.header_actions && props.header_actions.length
            ? props.header_actions.map((action, idx) => {
                  return (
                      <Button
                          key={idx}
                          className={[
                              "card-header-icon",
                              action.className,
                          ].join(" ")}
                          aria-label={action.content}
                          onClick={action.onClick}
                          content={action.content}
                          status={action.status}
                      />
                  );
              })
            : null;

    const actions =
        props.actions && props.actions.length
            ? props.actions.map((action, idx) => {
                  return (
                      <Button
                          key={idx}
                          className={["button", action.className].join(" ")}
                          aria-label={action.content}
                          onClick={action.onClick}
                          content={action.content}
                          status={action.status}
                      />
                  );
              })
            : null;

    return (
        <div className={["card", props.className].join(" ")}>
            {props.title ? (
                <div className="card-header">
                    <p className="card-header-title">{props.title}</p>
                    {header_actions ? (
                        <Auxillary>{header_actions}</Auxillary>
                    ) : null}
                </div>
            ) : null}
            {props.image ? (
                <div className="card-image">{props.image}</div>
            ) : null}
            {props.content ? (
                <div className="card-content">{props.content}</div>
            ) : null}
            <div className="buttons is-centered">{actions}</div>
            {props.footer ? (
                <div className="card-footer">{props.footer}</div>
            ) : null}
        </div>
    );
};

export default Card;
