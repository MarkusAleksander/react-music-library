import React, { Component } from 'react';
import Albums from './components/Albums/Albums';
import AlbumInput from './components/AlbumInput/AlbumInput';
//import './App.css';
import 'bulma/css/bulma.css';

import AlbumData from './data/albums.js';
import ArtistData from './data/artists.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albumData: AlbumData,
            artistData: ArtistData
        }
    }

    addNewAlbum = (newAlbum) => {
        let newAlbums = [...this.state.albumData];

        let newId = newAlbums[newAlbums.length - 1].id + 1;

        newAlbums.push(Object.assign(newAlbum, { id: newId }));

        this.setState({
            albumData: newAlbums
        });
    }

    updateOwnedState = (albumID) => {
        let allAlbums = [...this.state.albumData];

        let albumToUpdateIndex = allAlbums.findIndex(function findAlbum(album) {
            return album.id === albumID;
        });

        if (albumToUpdateIndex > -1) {
            allAlbums[albumToUpdateIndex].owned = !allAlbums[albumToUpdateIndex].owned;

            this.setState({
                albumData: allAlbums
            });
        }
    }

    render() {

        let d = this.state.artistData;
        let combinedAlbumArtistData = this.state.albumData.map(function (album) {
            let albumCopy = Object.assign({}, album);
            let artistIndex = d.findIndex(function (artist) { return artist.id === album.artistId });

            if (artistIndex > -1) {
                albumCopy.artist = ArtistData[artistIndex].artist;
            }

            return albumCopy;

        });

        return (
            <div className="App section" >
                <div className="container">
                    <Albums albums={combinedAlbumArtistData} clicked={this.updateOwnedState} />
                </div>
                <div className="container">
                    <AlbumInput onAddNewAlbum={this.addNewAlbum} />
                </div>
            </div>
        );
    }
}

export default App;
