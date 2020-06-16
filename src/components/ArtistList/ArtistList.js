import React from "react";

import Artist from "./../Artist/Artist";

const ArtistList = (props) => (
    <ul className="columns is-mobile is-multiline">
        {props.artists.map((artist) => (
            <li
                key={artist.artist_id}
                className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
            >
                <Artist
                    artist_title={artist.artist_title}
                    artist_image={artist.artist_image}
                    headerIconClick={() => props.onsaveselect(artist.artist_id)}
                />
            </li>
        ))}
    </ul>
);

export default ArtistList;
