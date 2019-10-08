import React, { useState } from 'react';
import './inputSelect.css';

const InputSelect = (props) => {

        const [ inputState, setInputState ] = useState({
            artists: props.artistData,
            filteredArtists: [],
            showDropdown: false
        });

        const filterArtists = () => {
            let filteredArtists = inputState.artists.map((artist) => {
                return <div className="album-dropdown__item" key={artist.id} onClick={props.onUpdate} data-value={artist.artist}>{artist.artist}</div>
            });
            let newData = Object.assign({}, inputState);
            newData.filteredArtists = filteredArtists;
            setInputState(newData);
        }

        const clearFilteredArtists = () => {
            let newData = Object.assign({}, inputState);
            newData.filteredArtists = [];
            setInputState(newData);
        }

        const onFocus = () => {
            console.log('focused');
            filterArtists();
        }

        const onBlur = () => {
            console.log('blurred');
            window.setTimeout(() => {
                clearFilteredArtists();
            }, 250);
        }

        return (
            <div className="column">
                <label htmlFor="album-artist">Artist Title:</label>
                <div className="control">
                    <input type="text" name="album-artist" id="album-artist" className="input album__input album__input--text" onFocus={onFocus} onBlur={onBlur} onChange={props.onUpdate} value={props.newArtist} autoComplete="off"/>
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
