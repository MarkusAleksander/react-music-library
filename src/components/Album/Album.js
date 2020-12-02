import React from "react";

import LazyImage from "./../UI/LazyImage/LazyImage";
import Card from "./../UI/Card/Card";
import Auxillary from "../../hoc/Auxillary";

import * as stateTypes from "./../../stateTypes";

const Album = (props) => {

    const actions = [stateTypes.WANT, stateTypes.HAVE].map((state) => {
        return {
            onClick: () => props.on_action(props.album, state),
            content: state,
            status: props.album.status,
            className:
                (props.album.status === state ? "is-primary" : "is-info") +
                (props.album.status === "loading" ? " is-loading" : ""),
        }
    });

    return (
        <Card
            className="album"
            title={props.album.album_title}
            actions={actions}
            image={
                props.album.album_image ? (
                    <LazyImage
                        src={props.album.album_image}
                        height="640"
                        width="640"
                    />
                ) : null
            }
            content={
                <Auxillary>
                    <p>{props.album.album_artist}</p>
                    <p>{new Date(props.album.release_date).toDateString()}</p>
                    <p className="is-capitalized">{props.album.album_type}</p>
                </Auxillary>
            }
            footer={null}
        />
    );
};

export default Album;
