import React from "react";

const Genre = (props) => {
    return (
        <div>
            <p className="is-capitalized">{props.genre}</p>
        </div>
    )
}

export default Genre;