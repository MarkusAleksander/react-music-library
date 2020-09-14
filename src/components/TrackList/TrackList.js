import React from "react";

import Track from "./../Track/Track";

const TrackList = (props) => {

    const tracks = props.tracks.map((track) => {
        return (
            <li><Track track={track} key={track.id} /></li>
        )
    });

    return (
        <ul className="tracklist">
            {tracks}
        </ul>
    )
}

export default TrackList;