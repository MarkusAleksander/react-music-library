import React from "react";

import Card from "./../UI/Card/Card";

const Album = (props) => {
    const actions = [
        {
            onClick:
                props.album.have_status === "active"
                    ? null
                    : () => props.onActionSelect(props.album.album_id, "want"),
            content: "Want",
            status: props.album.want_status,
            className:
                props.album.want_status === "active" ? "is-primary" : "is-info",
        },
        {
            onClick:
                props.album.want_status === "active"
                    ? null
                    : () => props.onActionSelect(props.album.album_id, "have"),
            content: "Have",
            status: props.album.have_status,
            className:
                props.album.have_status === "active" ? "is-primary" : "is-info",
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
