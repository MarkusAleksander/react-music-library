import React from "react";

import Album from "./../Album/Album";

const AlbumList = (props) => (
    <ul className="columns is-mobile is-multiline">
        {props.albums.map((album) => (
            <li
                key={album.album_id}
                className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen"
            >
                <Album
                    album_title={album.album_title}
                    album_artist={album.album_artist}
                    album_image={album.album_image}
                    album_id={album.album_id}
                    headerIconClick={() => props.onsaveselect(album.album_id)}
                />
            </li>
        ))}
    </ul>
);

export default AlbumList;
