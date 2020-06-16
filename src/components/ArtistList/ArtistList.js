import React from "react";

import Artist from "./../Artist/Artist";

const ArtistList = (props) => (
    <ul>
        {props.artists.map((artist) => (
            <li key={artist.artist_id}>
                <Artist
                    artist_title={artist.artist_title}
                    artist_image={artist.artist_image}
                />
            </li>
        ))}
    </ul>
);

export default ArtistList;
