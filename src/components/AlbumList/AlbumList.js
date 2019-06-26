import React from 'react';
import Album from '../Album/Album';
import './albumlist.css';

const AlbumList = () => {

    const albumData = [{
        artist: 'Sirenia',
        album: 'Arcane Astral Aeons'
    }, {
        artist: 'Sirenia',
        album: 'The Seventh Life Path'
    }, {
        artist: 'Sirenia',
        album: 'Perils Of The Deep Blue'
    },
    ]

    return (
        <ul className="album__list">
            {
                albumData.map((album) => {
                    return <Album artist={album.artist} album={album.album}></Album>
                })
            }
        </ul>
    )
}

export default AlbumList;