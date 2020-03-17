import React from "react";

import Auxillary from "../../hoc/Auxillary";
import Albums from "../../components/Albums/Albums";

const MusicLibrary = (props) => {
    let artistData = props.artists;
    let combinedAlbumArtistData = props.albums.map(function(album) {
        let albumCopy = Object.assign({}, album);
        let artistIdx = artistData.findIndex((artist) => {
            return artist.id === album.artistId;
        });

        if (artistIdx > -1) {
            albumCopy.artist = artistData[artistIdx].artist;
        }

        return albumCopy;
    });

    return (
        <Auxillary>
            <Albums
                albums={combinedAlbumArtistData}
                handleChangedOwned={props.handleChangedOwned}
                handleRemoveAlbum={props.handleRemoveAlbum}
            />
        </Auxillary>
    );
};

export default MusicLibrary;
