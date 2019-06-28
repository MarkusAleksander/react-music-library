import React from 'react';
import './album.css';

const Album = (props) => {

    return (
        <li className={'album__item album__item--' + (props.owned ? 'owned' : 'required')} onClick={props.click}>
            <p>{props.artist}</p>
            <p>{props.title}</p>
        </li>
    );
}

export default Album;