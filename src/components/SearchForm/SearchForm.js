import React, { Component } from "react";

import Search from "./Search/Search";
import Select from "./../UI/Select/Select";
import Button from "./../UI/Button/Button";

import axios from "./../../netlify_api";

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_text: "",
            search_type: "album",
            options: [
                {
                    text: "Artist",
                    value: "artist",
                },
                {
                    text: "Album",
                    value: "album",
                },
            ],
        };
    }

    handleTextChange = (e) => {
        let entered_text = e.target.value;
        this.setState({
            search_text: entered_text,
        });
    };

    handleClick = () => {
        // * validate
        if (this.state.search_text === "") return;

        let result_type = this.state.search_type;
        // * send search request
        axios
            .get("/search", {
                params: {
                    query: this.state.search_text,
                    type: result_type,
                },
            })
            .then((res) => {
                res.data.result_type = result_type;
                this.props.onsearchresult(res.data);
            })
            .catch((err) => console.log(err));
    };

    handleSelectChange = (e) => {
        let selected = e.target.value;
        this.setState({
            search_type: selected,
        });
    };

    render() {
        return (
            <div className="form search-form">
                <Search
                    onchange={this.handleTextChange}
                    value={this.state.search_text}
                />
                <Select
                    onchange={this.handleSelectChange}
                    options={this.state.options}
                    selected={this.state.search_type}
                />
                <div className="control">
                    <Button
                        type="is-primary"
                        onclick={this.handleClick}
                        text={"Search"}
                    />
                </div>
            </div>
        );
    }
}

export default SearchForm;
