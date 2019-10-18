import React, { useState } from 'react';
import './inputSelect.css';

const InputSelect = (props) => {

    const [inputState, setInputState] = useState({
        filteredData: [],
        showDropdown: false
    });

    const filterData = (userInput) => {
        if(userInput === "") {
            let newData = Object.assign({}, inputState);
            newData.filteredData = [];
            setInputState(newData);
        } else {
            let filteredData = props.data.map((data) => {
                if(data[props.dataTitle].toLowerCase().trim().indexOf(userInput.toLowerCase().trim()) > -1) {
                    return <div className="album-dropdown__item" key={data.id} onClick={props.onUpdate} data-value={data[props.dataTitle]}>{data[props.dataTitle]}</div>
                }
            });
            let newData = Object.assign({}, inputState);
            newData.filteredData = filteredData;
            setInputState(newData);
        }
    }

    const clearfilteredData = () => {
        let newData = Object.assign({}, inputState);
        newData.filteredData = [];
        setInputState(newData);
    }

    const onChange = (event) => {
        filterData(event.target.value);
        props.onUpdate(event);
    }

    const onBlur = () => {
        window.setTimeout(() => {
            clearfilteredData();
        }, 250);
    }

    return (
        <div className="field">
            <label htmlFor={"album-" + props.dataTitle}>{props.dataTitle}:</label>
            <div className="control">
                <input type="text" name={"album-" + props.dataTitle} id={"album-" + props.dataTitle} className="input album__input album__input--text" onBlur={onBlur} onChange={onChange} value={props.newData} autoComplete="off" />
            </div>
            <div className="album-dropdown">
                {
                    inputState.filteredData.length ?
                        <div>
                            {inputState.filteredData}
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default InputSelect;
