import React from "react";

import Card from "./../UI/Card/Card";
import Auxillary from "./../../hoc/Auxillary";

const Album = (props) => (
    <Card
        className="album"
        header={
            <Auxillary>
                <p className="album__title">{props.album_title}</p>
                <p className="album__artist">{props.album_artist}</p>
            </Auxillary>
        }
        body={props.album_image ? <img alt="" src={props.album_image} /> : null}
        footer={null}
    />
);

export default Album;
