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
        // * Check if we already have the album added
        let duplicateAlbumId = this.state.albumData.findIndex((album) => {
            return (newAlbum.artistId === album.artistId) && (newAlbum.title === album.title);
        });

        // * If found, don't continue
        if(duplicateAlbumId > -1) return;

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

    updateAlbumState = (albumID, updateType) => {
        let allAlbums = [...this.state.albumData];

        let albumToUpdateIndex = allAlbums.findIndex(function findAlbum(album) {
            return album.id === albumID;
        });

        if (albumToUpdateIndex > -1) {

            switch (updateType) {
                case "changeOwnedData":
                    allAlbums[albumToUpdateIndex].owned = !allAlbums[albumToUpdateIndex].owned;
                    break;
                case "removeAlbum":
                    allAlbums.splice(albumToUpdateIndex, 1);
                    break;
                default:
                    break;
            }


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
                        <Albums albums={combinedAlbumArtistData} clicked={this.updateAlbumState} />
                    </div>
                </div>
                <div className="section">
                    <div className="container">
                        <AlbumInput onAddNewAlbum={this.addNewAlbum} artistData={this.state.artistData} albumData={this.state.albumData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
