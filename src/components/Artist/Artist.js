import React from "react";

import Card from "./../UI/Card/Card";

const Artist = (props) => {
    // debugger;
    const actions = [
        {
            onClick: () => props.on_action(props.artist.artist_id),
            content: "Save",
            className:
                (props.artist.is_saved ? "is-primary" : "is-info") +
                (props.artist.status === "loading" ? " is-loading" : ""),
        },
    ];

    return (
        <Card
            className="artist"
            title={props.artist.artist_title}
            actions={actions}
            image={
                props.artist.artist_image ? (
                    <img alt="" src={props.artist.artist_image} />
                ) : null
            }
            content={<p>{props.artist.artist_title}</p>}
            footer={null}
        />
    );
};

export default Artist;
