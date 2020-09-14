import React from "react";

import Track from "./../Track/Track";

const TrackList = (props) => {

    const tracks = props.tracks.map((track) => {
        return (
            <Track track={track} key={track.id} />
        )
    });

    return (
        <div className="tracklist">
            {tracks}
        </div>
    )
}

export default TrackList;