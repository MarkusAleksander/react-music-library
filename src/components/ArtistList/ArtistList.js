import React, { Component } from "react";

import Artist from "./../Artist/Artist";

import axios from "./../../netlify_api.js";

class ArtistList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            processed_artists: [],
            max_display_results: 6,
        };
    }

    componentDidMount() {
        console.log("[ArtistList:componentDidMount]");
        this.processArtistData(this.props.artist_data);
    }

    componentDidUpdate() {
        console.log("[ArtistList:componentDidUpdate]");
        // this.processArtistData(this.props.artist_data);
    }

    processArtistData = (unprocessed_artist_data) => {
        const processed_artist_data = unprocessed_artist_data.artists.items
            .slice(0, this.state.max_display_results)
            .map((artist) => {
                return {
                    artist_title: artist.name,
                    artist_id: artist.id,
                    artist_image:
                        artist.images[0] && artist.images[0].url
                            ? artist.images[0].url
                            : null,
                };
            });

        this.setState({
            processed_artists: processed_artist_data,
        });
    };

    onSaveSelect = (id) => {
        axios
            .post("/save-artist", {
                artist_id: id,
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
                {this.state.processed_artists.map((artist) => (
                    <li
                        key={artist.artist_id}
                        className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
                    >
                        <Artist
                            artist_title={artist.artist_title}
                            artist_image={artist.artist_image}
                            header_actions={[
                                {
                                    onClick: () =>
                                        this.onSaveSelect(artist.artist_id),
                                    content: "Fave",
                                },
                            ]}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}

export default ArtistList;
