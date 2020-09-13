import React from "react";

import LazyImage from "./../UI/LazyImage/LazyImage";
import Card from "./../UI/Card/Card";

const Artist = (props) => {
    const header_actions = [
        {
            onClick: () => props.on_header_action(props.artist.artist_id),
            content: "i",
            className: "is-info",
        },
    ];

    const actions = [
        {
            onClick: () => props.on_action(props.artist.artist_id),
            content: props.artist.status === "saved" ? "Unsave" : "Save",
            className:
                props.artist.status === "saved"
                    ? "is-primary"
                    : props.artist.status === "loading"
                    ? "is-info is-loading"
                    : "is-info",
        },
    ];

    return (
        <Card
            className="artist"
            title={props.artist.artist_title}
            header_actions={header_actions}
            actions={actions}
            image={
                props.artist.artist_image ? (
                    <LazyImage
                        src={props.artist.artist_image}
                        height="640"
                        width="640"
                    />
                ) : null
            }
            content={<p>{props.artist.artist_title}</p>}
            footer={null}
        />
    );
};

export default Artist;
