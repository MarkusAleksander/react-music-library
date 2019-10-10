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

    sanitiseText = (text) => {
        return text.trim().toLowerCase();
    }

    addNewAlbum = (newAlbum) => {

        // * CHeck if we already have the album added
        let duplicateArtist;

        if (newAlbum.artistId === -1) {
            let newArtists = [...this.state.artistData];

            let newId = newArtists[newArtists.length - 1].id + 1;
            newArtists.push({
                id: newId,
                artist: newAlbum.artist
            });

            newAlbum.artistId = newId;

            this.setState({
                artistData: newArtists
            });
        }

        let newAlbums = [...this.state.albumData];

        let newId = newAlbums[newAlbums.length - 1].id + 1;

        newAlbums.push({
            id: newId,
            artistId: newAlbum.artistId,
            title: newAlbum.title,
            owned: newAlbum.owned
        });

        this.setState({
            albumData: newAlbums,
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
                albumCopy.artist = d[artistIndex].artist;
            }

            return albumCopy;

        });

        return (
            <div className="App" >
                <div className="section">
                    <div className="container">
                        <Albums albums={combinedAlbumArtistData} clicked={this.updateOwnedState} />
                    </div>
                </div>
                <div className="section">
                    <div className="container">
                        <AlbumInput onAddNewAlbum={this.addNewAlbum} artistData={this.state.artistData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
