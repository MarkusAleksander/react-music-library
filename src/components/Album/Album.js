import React from 'react';
import './album.css';

const Album = (props) => {
    return (
        <li className={'album__item album__item--' + (props.owned ? 'owned' : 'required')}>{props.artist} - {props.album}</li>
    );
}

export default Album;