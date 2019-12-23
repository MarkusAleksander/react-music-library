import React, { Component } from 'react';
//import './albumInput.css';
import Album from '../Albums/Album/Album';

import InputSelection from './InputSelect/InputSelect.js';
import InputCheckbox from './InputCheckbox/InputCheckbox.js';
import FileUpload from './FileUpload/FileUpload.js';

class AlbumInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newAlbumData: {
                title: '',
                artist: '',
                owned: false,
                artistId: -1,
                id: 0,
                imageFilePath: "https://dummyimage.com/820/b5b5b5/fff.jpg"
            }
        }
    }

    titleChangeHandler = (event) => {

        let album = {
            ...this.state.newAlbumData
        };
        album.title = event.target.nodeName === "INPUT" ? event.target.value : event.target.getAttribute('data-value');

        if (typeof album.artist === "string") {
            // * Check if artist already exists
            let albumDataIndex = this.props.albumData.findIndex(data => album.title.toLowerCase().trim() === data.title.toLowerCase().trim());

            if (albumDataIndex > -1) {
                album.artistId = this.props.albumData[albumDataIndex].id;
            } else {
                album.artistId = -1;
            }

            this.setState({
                newAlbumData: album
            });
        }
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
                owned: newAlbum.owned,
                image: newAlbum.imageFilePath
            });

            let nextAlbum = {
                title: '',
                artist: '',
                owned: false,
                artistId: -1,
                imageFilePath: "https://dummyimage.com/820/b5b5b5/fff.jpg"
            }

            this.setState({
                newAlbumData: nextAlbum
            });
        }

        return false;
    }

    fileChangeHandler = (res) => {

        let album = { ...this.state.newAlbumData }

        if (!Array.isArray(res.filesUploaded)) return;

        // * Get first item from list
        let upload = res.filesUploaded[0];

        if (upload.status.toLowerCase() != "stored" || !upload.url) return;

        album.imageFilePath = upload.url;

        this.setState({
            newAlbumData: album
        });
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <form className="column is-12-mobile is-6-tablet is-6-desktop" onSubmit={this.addAlbum}>

                            <h2 className="is-size-4">Add a new album:</h2>

                            <InputSelection onUpdate={this.titleChangeHandler} data={this.props.albumData} dataTitle={"title"} newData={this.state.newAlbumData.title}></InputSelection>
                            <InputSelection onUpdate={this.artistChangeHandler} data={this.props.artistData} dataTitle={"artist"} newData={this.state.newAlbumData.artist}></InputSelection>
                            <InputCheckbox onChangeHandler={this.ownedChangeHandler} isChecked={this.state.newAlbumData.owned} />
                            <FileUpload onChange={this.fileChangeHandler} />

                            <div className="field">
                                <div className="control">
                                    <button className="button is-primary">Add Album</button>
                                </div>
                            </div>

                        </form>

                        <div className="column is-12-mobile is-4-tablet is-4-desktop is-offset-1-tablet is-offset-1-desktop">
                            {
                                this.state.newAlbumData.artist !== '' || this.state.newAlbumData.title !== '' ?
                                    <Album
                                        key={this.state.newAlbumData.id}
                                        artistId={this.state.newAlbumData.artistId}
                                        artist={this.state.newAlbumData.artist}
                                        title={this.state.newAlbumData.title}
                                        owned={this.state.newAlbumData.owned}
                                        image={this.state.newAlbumData.imageFilePath}
                                        layoutClassOptions={""}></Album>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AlbumInput;
