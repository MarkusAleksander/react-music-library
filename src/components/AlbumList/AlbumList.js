import React from "react";

import Album from "./../Album/Album";

const AlbumList = (props) => (
    <ul>
        {props.albums.map((album) => (
            <li key={album.album_id}>
                <Album
                    album_title={album.album_title}
                    album_artist={album.album_artist}
                    album_image={album.album_image}
                    album_id={album.album_id}
                />
            </li>
        ))}
    </ul>
);

export default AlbumList;
