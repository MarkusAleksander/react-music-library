import React from 'react';

const InputCheckbox = (props) => {
    return (
        <div className="field">
            <div className="control">
                <label className="checkbox">
                    <input type="checkbox" name="album-owned" id="album-owned" className="album__input album__input--checkbox" onChange={props.onChangeHandler} checked={props.isChecked} />
                    Is album already owned?
                </label>
            </div>
        </div>
    )
}

export default InputCheckbox;
