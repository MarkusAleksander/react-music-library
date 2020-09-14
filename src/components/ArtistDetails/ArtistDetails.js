import React from "react";

import TrackList from "./../TrackList/TrackList";

const ArtistDetails = (props) => {
    return (
        <div className="section">
            {props.artist ?
                <div className="container">
                    <div className="columns is-mobile ">
                        <div className="column is-half">
                            {props.artist.artist_image ?
                                <img src={props.artist.artist_image} alt="" />
                                : null}
                        </div>
                        <div className="column is-half">
                            <h1 className="title">{props.artist.artist_title}</h1>

                            {props.artist_details.top_tracks ?
                                <TrackList tracks={props.artist_details.top_tracks.tracks} />
                                : null}

                        </div>
                    </div>
                </div>
                : null}

            {props.artist_details.related_artists ?
                <div className="container">
                    <div className="column"></div>
                </div>
                : null}

            {props.artist_details.albums ?
                <div className="container">
                    <div className="column"></div>
                </div>
                : null}
        </div>
    );

}

export default ArtistDetails;