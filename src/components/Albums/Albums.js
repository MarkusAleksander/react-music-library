import React from 'react';
import Album from './Album/Album';

const Albums = (props) => (
    props.albums.length > 0 ?
        <div className="album__list columns is-multiline is-vcentered">
            {
                props.albums.map((album) => (
                    <Album
                        key={album.id}
                        artistId={album.artistId}
                        title={album.title}
                        owned={album.owned}
                        key={album.id}
                        click={() => props.clicked(album.id)}></Album>
                ))
            }
        </div>
        :
        <p>No Albums to show!</p>
)

export default Albums;
