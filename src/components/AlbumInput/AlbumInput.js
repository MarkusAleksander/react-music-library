import React, { Component } from "react";
//import './albumInput.css';
import Album from "../Albums/Album/Album";

import InputSelection from "./InputSelect/InputSelect.js";
import InputCheckbox from "./InputCheckbox/InputCheckbox.js";
import FileUpload from "./FileUpload/FileUpload.js";

class AlbumInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newAlbumData: {
                title: props.albumData.title || "",
                artist: props.albumData.artist || "",
                owned: props.albumData.owned || false,
                artistId: props.albumData.artistId || -1,
                id: props.albumData.id || 0,
                imageFilePath:
                    props.albumData.imageFilePath ||
                    "https://dummyimage.com/820/b5b5b5/fff.jpg",
            },
        };
    }

    dataFormChangeHandler = (event, dataType) => {
        let album = {
            ...this.state.newAlbumData,
        };

        album[dataType] =
            event.target.nodeName === "INPUT"
                ? event.target.value
                : event.target.getAttribute("data-value");

        if (typeof album[dataType] === "string") {
            // * Check if artist already exists
            let dIdx = this.props.data[dataType].findIndex(
                (d) =>
                    album[dataType].toLowerCase().trim() ===
                    d[dataType].toLowerCase().trim()
            );

            if (dIdx > -1) {
                album.artistId = this.props.data.artist[dIdx].id;
            } else {
                album.artistId = -1;
            }

            this.setState({
                newAlbumData: album,
            });

            this.props.onEdit(album);
        }
    };

    ownedChangeHandler = (event) => {
        let album = {
            ...this.state.newAlbumData,
        };
        album.owned = event.target.checked;

        this.setState({
            newAlbumData: album,
        });

        this.props.onEdit(album);
    };

    fileChangeHandler = (res) => {
        debugger;
        let album = {
            ...this.state.newAlbumData,
        };

        if (!Array.isArray(res.filesUploaded)) return;

        // * Get first item from list
        let upload = res.filesUploaded[0];

        if (upload.status.toLowerCase() !== "stored" || !upload.url) return;

        album.imageFilePath = upload.url;

        this.setState({
            newAlbumData: album,
        });

        this.props.onEdit(album);
    };

    onSubmit = (event) => {
        event.preventDefault();
        let newAlbum = {
            ...this.state.newAlbumData,
        };

        if (
            newAlbum.title !== "" ||
            newAlbum.artistId !== -1 ||
            newAlbum.artist !== ""
        ) {
            this.props.onConfirm(newAlbum);
        }

        return false;
    };

    render() {
        let dataForms = Object.entries(this.props.data).map((v, k) => {
            return (
                <InputSelection
                    key={k}
                    onUpdate={(event) =>
                        this.dataFormChangeHandler(event, v[0])
                    }
                    data={v[1]}
                    dataTitle={v[0]}
                    newData={this.state.newAlbumData[v[0]]}
                ></InputSelection>
            );
        });

        return (
            <form onSubmit={this.onSubmit}>
                <h2 className="is-size-4">{this.props.formTitleText}</h2>
                {dataForms}
                <InputCheckbox
                    onChangeHandler={this.ownedChangeHandler}
                    isChecked={this.state.newAlbumData.owned}
                />
                <FileUpload onChange={this.fileChangeHandler} />

                <div className="field">
                    <div className="control">
                        <button className="button is-primary">
                            {this.props.confirmText}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default AlbumInput;
