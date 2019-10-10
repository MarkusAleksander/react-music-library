import React, { useState } from 'react';
import './inputSelect.css';

const InputSelect = (props) => {

    const [inputState, setInputState] = useState({
        filteredArtists: [],
        showDropdown: false
    });

    const filterArtists = (userInput) => {
        if(userInput === "") {
            let newData = Object.assign({}, inputState);
            newData.filteredArtists = [];
            setInputState(newData);
        } else {
            let filteredArtists = props.artistData.map((artist) => {
                if(artist.artist.toLowerCase().trim().indexOf(userInput.toLowerCase().trim()) > -1) {
                    return <div className="album-dropdown__item" key={artist.id} onClick={props.onUpdate} data-value={artist.artist}>{artist.artist}</div>
                }
            });
            let newData = Object.assign({}, inputState);
            newData.filteredArtists = filteredArtists;
            setInputState(newData);
        }
    }

    const clearFilteredArtists = () => {
        let newData = Object.assign({}, inputState);
        newData.filteredArtists = [];
        setInputState(newData);
    }

    const onChange = (event) => {
        filterArtists(event.target.value);
        props.onUpdate(event);
    }

    const onBlur = () => {
        window.setTimeout(() => {
            clearFilteredArtists();
        }, 250);
    }

    return (
        <div className="field">
            <label htmlFor="album-artist">Artist Title:</label>
            <div className="control">
                <input type="text" name="album-artist" id="album-artist" className="input album__input album__input--text" onBlur={onBlur} onChange={onChange} value={props.newArtist} autoComplete="off" />
            </div>
            <div className="album-dropdown">
                {
                    inputState.filteredArtists.length ?
                        <div>
                            {inputState.filteredArtists}
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default InputSelect;
