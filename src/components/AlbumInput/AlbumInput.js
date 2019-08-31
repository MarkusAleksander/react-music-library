import React, { Component } from 'react';
//import './albumInput.css';
import Albums from '../Albums/Albums';

import ArtistData from '../../data/artists';

class AlbumInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newAlbumData: {
                title: '',
                artist: '',
                owned: false,
                artistId: -1
            },
            artistData: ArtistData
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
        album.artist = event.target.value;
        album.artistId = -1;

        this.setState({
            newAlbumData: album
        });
    }

    artistIdChangeHandler = (event) => {
        let album = {
            ...this.state.newAlbumData
        };

        album.artistId = Number(event.target.value);

        if (album.artistId !== -1) {
            let artistData = this.state.artistData.find((artist) => {
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

                    <div className="field">
                        <label htmlFor="album-title">Album Title:</label>
                        <div className="control">
                            <input type="text" name="album-title" id="album-title" className="input album__input album__input--text" onChange={this.titleChangeHandler} value={this.state.newAlbumData.title} />
                        </div>
                    </div>

                    <div className="field">
                        <p>Enter Artist or Select From Existing Artists</p>
                        <div className="columns">
                            <div className="column">
                                <label htmlFor="album-artist">Album Title:</label>
                                <div className="control">
                                    <input type="text" name="album-artist" id="album-artist" className="input album__input album__input--text" onChange={this.artistChangeHandler} value={this.state.newAlbumData.artist} />
                                </div>
                            </div>
                            {
                                this.state.artistData.length ?
                                    <div className="column">
                                        <label>Select an existing artist</label>
                                        <div className="control">
                                            <div className="select">
                                                <select onChange={this.artistIdChangeHandler}>
                                                    <option value="-1">Select Artist</option>
                                                    {
                                                        this.state.artistData.map((artist) => {
                                                            return <option key={artist.id} value={artist.id}>{artist.artist}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" name="album-owned" id="album-owned" className="album__input album__input--checkbox" onChange={this.ownedChangeHandler} value={this.state.newAlbumData.owned} />
                                Is album already owned?
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="is-primary">Add Album</button>
                        </div>
                    </div>
                    <div className="columns">
                        {
                            this.state.newAlbumData.artist !== '' || this.state.newAlbumData.title !== '' ?
                                <Albums albums={[this.state.newAlbumData]}></Albums>
                                :
                                null
                        }
                    </div>
                </form>
            </div>
        )
    }

}

export default AlbumInput;
