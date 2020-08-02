import React from "react";

import Card from "./../UI/Card/Card";

const Album = (props) => {
    // debugger;
    const actions = [
        {
            onClick:
                props.album.status === "want"
                    ? null
                    : () => props.on_action(props.album.album_id, "want"),
            content: "Want",
            status: props.album.status,
            className:
                (props.album.status === "want" ? "is-primary" : "is-info") +
                (props.album.status === "loading" ? " is-loading" : ""),
        },
        {
            onClick:
                props.album.status === "have"
                    ? null
                    : () => props.on_action(props.album.album_id, "have"),
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
                    <img alt="" src={props.album.album_image} />
                ) : null
            }
            content={<p>{props.album.album_artist}</p>}
            footer={null}
        />
    );
};

export default Album;
