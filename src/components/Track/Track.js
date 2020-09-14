import React from "react";

const Track = (props) => {
    return (
        <div className="track">
            <div className="columns is-mobile">
                <div className="column is-half">
                    {
                        props.track.album.images && props.track.album.images[0] ? <img alt="" src={props.track.album.images[0].url} /> : null
                    }
                </div>
                <div className="column is-half">
                    <p className="title is-size-5">{props.track.name}</p>
                    <p className="subtitle is-size-6">{props.track.album.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Track;