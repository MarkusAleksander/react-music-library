import React from "react";
import Input from "../Input/Input";

const Search = (props) => (
    <Input
        className="search"
        type="text"
        onchange={props.onchange}
        value={props.value}
    />
);

export default Search;
