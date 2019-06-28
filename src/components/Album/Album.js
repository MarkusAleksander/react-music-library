import React from 'react';
import './album.css';

const Album = (props) => {
    return (
        <li className={'album__item album__item--' + (props.owned ? 'owned' : 'required')} onClick={props.click}>{props.artist} - {props.title}</li>
    );
}

export default Album;