import React from 'react';
import Album from './Album/Album';

const Albums = (props) => (
    <div className="section">
        <div className="container">
            {
                props.albums.length > 0 ?
                    <div className="album__list columns is-mobile is-multiline">
                        {
                            props.albums.map((album) => (
                                <Album
                                    key={album.id}
                                    artistId={album.artistId}
                                    artist={album.artist}
                                    title={album.title}
                                    owned={album.owned}
                                    image={album.image}
                                    changeOwnedDataClick={() => props.clicked(album.id, "changeOwnedData")}
                                    removeAlbumClick={() => props.clicked(album.id, "removeAlbum")}
                                    layoutClassOptions={"column is-6-mobile is-4-tablet is-3-desktop"}></Album>
                            ))
                        }
                    </div>
                    :
                    <p>No Albums to show!</p>
            }
        </div>
    </div>
)

export default Albums;
