import React from "react";
import Input from "../../UI/Input/Input";

const Search = (props) => (
    <Input
        className="search"
        type="text"
        onChange={props.onChange}
        onSubmit={props.onSubmit}
        value={props.value}
        label={props.label}
    />
);

export default Search;
