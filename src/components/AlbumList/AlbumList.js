import React, { Component } from 'react';
import Album from '../Album/Album';
import './albumlist.css';

class AlbumList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albumData: [{
                id: 1,
                artist: 'Sirenia',
                album: 'Arcane Astral Aeons',
                owned: true
            }, {
                id: 2,
                artist: 'Sirenia',
                album: 'The Seventh Life Path',
                owned: false
            }, {
                id: 3,
                artist: 'Sirenia',
                album: 'Perils Of The Deep Blue',
                owned: true
            },
            ]
        }

        this.updateAlbumOwnedState = this.updateAlbumOwnedState.bind(this);
    }

    updateAlbumOwnedState = () => { }

    render() {
        return (
            <ul className="album__list" >
                {
                    this.state.albumData.map((album) => {
                        return <Album artist={album.artist} album={album.album} owned={album.owned} onClick={this.updateAlbumOwnedState}></Album>
                    })
                }
            </ul>
        )
    }
}

export default AlbumList;