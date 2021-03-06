import React from "react";

import TrackList from "./../TrackList/TrackList";
import ArtistList from "./../ArtistList/ArtistList";
import AlbumList from "./../AlbumList/AlbumList";
import GenreList from "./../GenreList/GenreList";

import Auxillary from "./../../hoc/Auxillary";

const layout_classlist = "is-full-mobile is-half-tablet is-one-third-desktop";

const ArtistDetails = (props) => {
    return (
        <Auxillary>
            {props.artist ?
                <div className="section">
                    <div className="columns">
                        <div className="column is-half is-marginless">
                            {props.artist.artist_image ?
                                <img src={props.artist.artist_image} alt="" />
                                : null}
                            <h1 className="title">{props.artist.artist_title}</h1>
                            <GenreList genres={props.artist.genres} />
                        </div>
                        <div className="column is-half">
                            <h2 className="subtitle">Top Tracks</h2>

                            {props.artist_details.top_tracks ?
                                <TrackList tracks={props.artist_details.top_tracks.tracks} />
                                : null}

                        </div>
                    </div>
                </div>
                : null}

            {props.artist_details.albums ?
                <div className="section">
                    <h1 className="subtitle">Albums</h1>
                    <AlbumList layout_classname={layout_classlist} albums={props.artist_details.albums.items} />
                </div>
                : null}

            {props.artist_details.related_artists ?
                <div className="section">
                    <h1 className="subtitle">Related Artists</h1>
                    <ArtistList layout_classname={layout_classlist} artists={props.artist_details.related_artists.artists} />
                </div>
                : null}

        </Auxillary>
    );

}

export default ArtistDetails;