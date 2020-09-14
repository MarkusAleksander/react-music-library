import React from "react";

import Button from "./../Button/Button";

const Modal = (props) => (
    <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="box">{props.children}</div>
        </div>
        {props.onclose ? (
            <Button
                onClick={props.onclose}
                className="modal-close is-large"
                aria-label="close"
            />
        ) : null}
    </div>
);

export default Modal;
