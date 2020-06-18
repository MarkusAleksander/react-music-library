import React from "react";

import Card from "./../UI/Card/Card";

const Album = (props) => (
    <Card
        className="album"
        title={props.album_title}
        header_actions={props.header_actions}
        image={
            props.album_image ? <img alt="" src={props.album_image} /> : null
        }
        content={<p>{props.album_artist}</p>}
        footer={null}
    />
);

export default Album;
