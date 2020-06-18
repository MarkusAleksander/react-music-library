import React, { Component } from "react";

import Album from "./../Album/Album";

import axios from "./../../netlify_api.js";

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processed_albums: [],
            max_display_results: 6,
        };
    }

    componentDidMount() {
        console.log("[AlbumList:componentDidMount]");
        this.processAlbumData(this.props.album_data);
    }

    componentDidUpdate(prevProps) {
        console.log("[AlbumList:componentDidUpdate]");
        if (prevProps.album_data !== this.props.album_data) {
            console.log("[AlbumList:componentDidUpdate:props don't match]");
            this.processAlbumData(this.props.album_data);
        } else {
            console.log("[AlbumList:componentDidUpdate:props match]");
        }
    }

    processAlbumData = (unprocessed_album_data) => {
        const processed_album_data = unprocessed_album_data.albums.items
            .slice(0, this.state.max_display_results)
            .map((album) => {
                return {
                    album_title: album.name,
                    album_id: album.id,
                    album_image:
                        album.images[0] && album.images[0].url
                            ? album.images[0].url
                            : null,
                    album_artist:
                        album.artists[0] && album.artists[0].name
                            ? album.artists[0].name
                            : null,
                    album_artist_id:
                        album.artists[0] && album.artists[0].id
                            ? album.artists[0].id
                            : null,
                };
            });

        this.setState({
            processed_albums: processed_album_data,
        });
    };

    onSelectHandler = (id, status) => {
        axios
            .post("/save-album", {
                album_id: id,
                status: status,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <ul className="columns is-mobile is-multiline">
                {this.state.processed_albums.map((album) => (
                    <li
                        key={album.album_id}
                        className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                    >
                        <Album
                            album_title={album.album_title}
                            album_artist={album.album_artist}
                            album_image={album.album_image}
                            album_id={album.album_id}
                            header_actions={[
                                {
                                    onClick: () =>
                                        this.onSelectHandler(
                                            album.album_id,
                                            "want"
                                        ),
                                    content: "Want",
                                },
                                {
                                    onClick: () =>
                                        this.onSelectHandler(
                                            album.album_id,
                                            "have"
                                        ),
                                    content: "Have",
                                },
                            ]}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}
export default AlbumList;
