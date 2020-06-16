import React from "react";

import Card from "./../UI/Card/Card";

const Artist = (props) => (
    <Card
        className="artist"
        title={props.artist_title}
        onHeaderIconClick={props.headerIconClick}
        image={
            props.artist_image ? <img alt="" src={props.artist_image} /> : null
        }
        footer={null}
    />
);

export default Artist;
