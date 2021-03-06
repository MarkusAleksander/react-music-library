import React, { Component } from "react";

import Search from "./Search/Search";
import Select from "./../UI/Select/Select";
import Button from "./../UI/Button/Button";

import axios from "./../../netlify_api";

import { SEARCH } from "./../../api_endpoints";

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_text: "",
            search_type: "album",
            is_searching: false,
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

    handleSubmit = () => {
        let result_type = this.state.search_type;
        // * send search request

        this.setState({
            is_searching: true,
        });

        axios
            .get(SEARCH, {
                params: {
                    query: this.state.search_text,
                    type: result_type,
                },
            })
            .then((res) => {
                res.data.result_type = result_type;
                this.props.onsearchresponse(res.data);
                this.setState({
                    is_searching: false,
                });
            })
            .catch((err) => console.log(err));
    }

    handleClick = () => {
        // * validate
        if (this.state.search_text === "") return;
        this.handleSubmit();
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
                    onChange={this.handleTextChange}
                    onSubmit={this.handleSubmit}
                    value={this.state.search_text}
                    label={"Search Term:"}
                />
                <Select
                    onchange={this.handleSelectChange}
                    options={this.state.options}
                    selected={this.state.search_type}
                    label={"Search Type"}
                />
                <div className="control">
                    <Button
                        className={
                            (this.state.is_searching ? "is-loading " : "") +
                            "is-primary"
                        }
                        onClick={this.handleClick}
                        content={"Search"}
                    />
                </div>
            </div>
        );
    }
}

export default SearchForm;
