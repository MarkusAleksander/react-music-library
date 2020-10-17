import React from "react";

import LazyImage from "./../UI/LazyImage/LazyImage";
import Card from "./../UI/Card/Card";
import Auxillary from "../../hoc/Auxillary";

const Album = (props) => {
    const actions = [
        {
            onClick: () => props.on_action(props.album, "want"),
            content: "Want",
            status: props.album.status,
            className:
                (props.album.status === "want" ? "is-primary" : "is-info") +
                (props.album.status === "loading" ? " is-loading" : ""),
        },
        {
            onClick: () => props.on_action(props.album, "have"),
            content: "Have",
            status: props.album.status,
            className:
                (props.album.status === "have" ? "is-primary" : "is-info") +
                (props.album.status === "loading" ? " is-loading" : ""),
        },
    ];

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
