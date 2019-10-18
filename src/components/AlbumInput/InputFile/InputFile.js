import React from 'react';

const InputFile = (props) => {
    return (
        <div className="field">
            <label htmlFor={"album-" + props.dataTitle}>{props.dataTitle}:</label>
            <div className="control">
                <input type="text" name={"album-" + props.dataTitle} id={"album-" + props.dataTitle} className="input album__input album__input--text" onBlur={onBlur} onChange={onChange} value={props.newData} autoComplete="off" />
            </div>
        </div>
    )
}