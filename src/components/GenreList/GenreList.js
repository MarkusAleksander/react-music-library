import React from "react";

import Genre from "./../Genre/Genre";

const GenreList = (props) => {

    const genres = props.genres.map((genre) => { <li><Genre genre={genre} /></li> });

    return (
        <ul>
            {genres}
        </ul>
    )
}

export default GenreList;