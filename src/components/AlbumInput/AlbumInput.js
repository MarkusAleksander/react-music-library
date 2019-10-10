import React, { Component } from 'react';
//import './albumInput.css';
import Album from '../Albums/Album/Album';

import InputSelection from './InputSelect/InputSelect.js';

class AlbumInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newAlbumData: {
                title: '',
                artist: '',
                owned: false,
                artistId: -1,
                id: 0
            }
        }
    }

    titleChangeHandler = (event) => {

        let album = {
            ...this.state.newAlbumData
        };
        album.title = event.target.value;

        this.setState({
            newAlbumData: album
        });
    }

    artistChangeHandler = (event) => {
        let album = {
            ...this.state.newAlbumData
        };
        album.artist = event.target.nodeName === "INPUT" ? event.target.value : event.target.getAttribute('data-value');

        if (typeof album.artist === "string") {
            // * Check if artist already exists
            let artistDataIndex = this.props.artistData.findIndex(data => album.artist.toLowerCase().trim() === data.artist.toLowerCase().trim());

            if (artistDataIndex > -1) {
                album.artistId = this.props.artistData[artistDataIndex].id;
            } else {
                album.artistId = -1;
            }

            this.setState({
                newAlbumData: album
            });
        }
    }

    artistIdChangeHandler = (event) => {
        let album = {
            ...this.state.newAlbumData
        };

        album.artistId = Number(event.target.value);

        if (album.artistId !== -1) {
            let artistData = this.props.artistData.find((artist) => {
                return artist.id === album.artistId;
            });
            album.artist = artistData.artist;
        }

        this.setState({
            newAlbumData: album
        });
    }

    ownedChangeHandler = (event) => {

        let album = {
            ...this.state.newAlbumData
        };
        album.owned = event.target.checked;

        this.setState({
            newAlbumData: album
        });
    }

    addAlbum = (event) => {
        event.preventDefault();
        let newAlbum = {
            ...this.state.newAlbumData
        };

        if (
            newAlbum.title !== '' ||
            newAlbum.artistId !== -1 ||
            newAlbum.artist !== ''
        ) {

            this.props.onAddNewAlbum({
                artistId: newAlbum.artistId,
                artist: newAlbum.artist,
                title: newAlbum.title,
                owned: newAlbum.owned
            });

            let nextAlbum = {
                title: '',
                artist: '',
                owned: false,
                artistId: -1
            }

            this.setState({
                newAlbumData: nextAlbum
            });
        }

        return false;
    }

    render() {
        return (
            <div className="columns">
                <form className="column" onSubmit={this.addAlbum}>

                    <h2 className="is-size-4">Add a new album:</h2>

                    <div className="field">
                        <label htmlFor="album-title">Album Title:</label>
                        <div className="control">
                            <input type="text" name="album-title" id="album-title" className="input album__input album__input--text" onChange={this.titleChangeHandler} value={this.state.newAlbumData.title} />
                        </div>
                    </div>

                    <InputSelection onUpdate={this.artistChangeHandler} artistData={this.props.artistData} newArtist={this.state.newAlbumData.artist}></InputSelection>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" name="album-owned" id="album-owned" className="album__input album__input--checkbox" onChange={this.ownedChangeHandler} checked={this.state.newAlbumData.owned} />
                                Is album already owned?
                            </label>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-primary">Add Album</button>
                        </div>
                    </div>
                </form>

                <div className="column">
                    {
                        this.state.newAlbumData.artist !== '' || this.state.newAlbumData.title !== '' ?
                            <Album
                                key={this.state.newAlbumData.id}
                                artistId={this.state.newAlbumData.artistId}
                                artist={this.state.newAlbumData.artist}
                                title={this.state.newAlbumData.title}
                                owned={this.state.newAlbumData.owned}
                                layoutClassOptions={""}></Album>
                            :
                            null
                    }
                </div>
            </div>
        )
    }

}

export default AlbumInput;
