import React, { Component } from 'react';
import Album from '../Album/Album';
import './albumlist.css';

import AlbumData from '../../data/albums';
import ArtistData from '../../data/artists';

class AlbumList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albumData: AlbumData,
            artistData: ArtistData,
        }

        this.updateAlbumOwnedState = this.updateAlbumOwnedState.bind(this);
    }

    updateAlbumOwnedState = (albumID) => {

        let albumIndex = this.state.albumData.findIndex(a => {
            return a.id === albumID;
        });

        let album = {
            ...this.state.albumData[albumIndex]
        }

        album.owned = !album.owned;

        const newAlbumData = [...this.state.albumData];
        newAlbumData[albumIndex] = album;

        this.setState({
            albumData: newAlbumData
        });
    }

    createAlbumItem = (albumId) => {
        let album = this.state.albumData.find(el => {
            return el.id === albumId;
        });
        let artist = this.state.artistData.find(el => {
            return el.id === album.artistId;
        })

        return <Album key={album.id} artist={artist.artist} title={album.title} owned={album.owned} click={() => this.updateAlbumOwnedState(album.id)}></Album>
    }

    render() {
        return (
            <ul className="album__list" >
                {
                    this.state.albumData.length > 0 ?
                        this.state.albumData.map((album) => this.createAlbumItem(album.id))
                        :
                        <p>No Albums to show!</p>
                }
            </ul>
        )
    }
}

export default AlbumList;