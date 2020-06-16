import React from "react";

import Card from "./../UI/Card/Card";
import Auxillary from "./../../hoc/Auxillary";

const Artist = (props) => (
    <Card
        className="artist"
        header={
            <Auxillary>
                <p className="artist__title">{props.artist_title}</p>
            </Auxillary>
        }
        body={
            props.artist_image ? <img alt="" src={props.artist_image} /> : null
        }
        footer={null}
    />
);

export default Artist;
