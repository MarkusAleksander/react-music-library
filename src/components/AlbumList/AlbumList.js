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
                title: 'Arcane Astral Aeons',
                owned: true
            }, {
                id: 2,
                artist: 'Sirenia',
                title: 'The Seventh Life Path',
                owned: false
            }, {
                id: 3,
                artist: 'Sirenia',
                title: 'Perils Of The Deep Blue',
                owned: true
            },
            ]
        }

        this.updateAlbumOwnedState = this.updateAlbumOwnedState.bind(this);
    }

    updateAlbumOwnedState = (albumID) => {
        let newAlbumData = this.state.albumData.map(album => {
            if(album.id === albumID) {
                album.owned = !album.owned;
            }
            return album;
        });

        this.setState({
            albumData: newAlbumData
        });
    }

    render() {
        return (
            <ul className="album__list" >
                {
                    this.state.albumData.map((album) => {
                        return <Album key={album.id} artist={album.artist} title={album.title} owned={album.owned} click={() => this.updateAlbumOwnedState(album.id)}></Album>
                    })
                }
            </ul>
        )
    }
}

export default AlbumList;