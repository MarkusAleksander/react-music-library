import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
    return (
        <div className="error_message">
            <div className="error_message__overlay"></div>
            <div className="error_message__content">
                <p className="error_message__copy">{props.errorMessage}</p>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" onClick={props.onButtonClick}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessage;
