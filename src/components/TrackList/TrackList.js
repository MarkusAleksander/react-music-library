import React from "react";

import Track from "./../Track/Track";

const TrackList = (props) => {

    const tracks = props.tracks.map((track) => {
        return (
            <li key={track.id}><Track track={track} /></li>
        )
    });

    return (
        <ul className="tracklist">
            {tracks}
        </ul>
    )
}

export default TrackList;