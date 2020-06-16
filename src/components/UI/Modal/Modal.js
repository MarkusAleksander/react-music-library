import React from "react";

import Button from "./../Button/Button";

const Modal = (props) => (
    <div className="modal">
        <div className="modal-background"></div>
        <div className="modal-content">{props.children}</div>
        {props.onclose ? (
            <Button
                onclick={props.onclose}
                className="modal-close is-large"
                aria-label="close"
            />
        ) : null}
    </div>
);

export default Modal;
