import React, { Component } from 'react';
import './albumInput.css';
import Album from '../Album/Album';

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
        album.artistId = 0;

        this.setState({
            newAlbumData: album
        });
    }

    artistIdChangeHandler = (event) => {
        let album = {
            ...this.state.newAlbumData
        };

        album.artistId = Number(event.target.value);

        if (album.artistId != -1) {
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

    render() {
        return (
            <div>
                <label htmlFor="album-title">Album Title:</label>
                <input type="text" name="album-title" id="album-title" className="album__input album__input--text" onChange={this.titleChangeHandler} value={this.state.title} />
                <label htmlFor="album-artist">Enter Artist or Select From Existing Artists:</label>
                <input type="text" name="album-artist" id="album-artist" className="album__input album__input--text" onChange={this.artistChangeHandler} value={this.state.artist} />
                {
                    this.state.artistData.length ?
                        <select onChange={this.artistIdChangeHandler}>
                            <option value="0">Select Artist</option>
                            {
                                this.state.artistData.map((artist) => {
                                    return <option value={artist.id}>{artist.artist}</option>
                                })
                            }
                        </select>
                        :
                        null
                }
                <label htmlFor="album-owned">Album is Owned:</label>
                <input type="checkbox" name="album-owned" id="album-owned" className="album__input album__input--checkbox" onChange={this.ownedChangeHandler} value={this.state.owned} />
                {
                    this.state.newAlbumData.artist !== '' || this.state.newAlbumData.title !== '' ?
                        <Album artist={this.state.newAlbumData.artist} title={this.state.newAlbumData.title} owned={this.state.newAlbumData.owned}></Album>
                        :
                        null
                }
            </div>
        )
    }

}

export default AlbumInput;