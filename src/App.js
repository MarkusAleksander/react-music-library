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

    render() {

        return (
            <div className="App section" >
                <div className="container">
                    <Albums albums={this.state.albumData} />
                </div>
                <div className="container">
                    <AlbumInput onAddNewAlbum={this.addNewAlbum} />
                </div>
            </div>
        );
    }
}

export default App;
