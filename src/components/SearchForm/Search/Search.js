import React from "react";
import Input from "../../UI/Input/Input";

const Search = (props) => (
    <Input
        className="search"
        type="text"
        onchange={props.onchange}
        value={props.value}
        label={props.label}
    />
);

export default Search;
