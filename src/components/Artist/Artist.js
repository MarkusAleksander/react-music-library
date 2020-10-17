import React, { Component } from "react";

import LazyImage from "./../UI/LazyImage/LazyImage";
import Card from "./../UI/Card/Card";
import Auxillary from "./../../hoc/Auxillary";

import axios from "./../../netlify_api.js";

import {
    GET_ARTIST_DATA,
} from "./../../api_endpoints";

import Modal from "./../UI/Modal/Modal";
import ArtistDetails from "./../ArtistDetails/ArtistDetails";

class Artist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal_is_open: false,
            artist_details: null
        }
    }

    toggleModal = () => {
        this.setState({
            modal_is_open: !this.state.modal_is_open
        })
    }

    onViewDetailsHandler = (artist_id) => {
        if (this.state.artist_details !== null && Object.keys(this.state.artist_details).length) {
            this.toggleModal();
            return;
        }

        let endpoint, onResponse, onError, options;

        options = {
            params: {
                artist_id,
            },
        };

        endpoint = GET_ARTIST_DATA;

        onResponse = (res) => {
            if (res.status === 200) {
                console.log(res.data);
                this.setState({
                    artist_details: res.data
                });
                this.toggleModal();
            }
        };
        onError = (error) => {
            console.log(error);
        };

        axios
            .get(endpoint, options)
            .then(onResponse)
            .catch(onError);
    }


    render() {

        const header_actions = [
            {
                onClick: () => this.onViewDetailsHandler(this.props.artist.artist_id),
                content: "i",
                className: "is-info",
            },
        ];

        const actions = [
            {
                onClick: () => this.props.on_action(this.props.artist),
                content: this.props.artist.status === "saved" ? "Unsave" : "Save",
                className:
                    this.props.artist.status === "saved"
                        ? "is-primary"
                        : this.props.artist.status === "loading"
                            ? "is-info is-loading"
                            : "is-info",
            },
        ];

        return (
            <Auxillary>
                <Card
                    className="artist"
                    title={this.props.artist.artist_title}
                    header_actions={header_actions}
                    actions={actions}
                    image={
                        this.props.artist.artist_image ? (
                            <LazyImage
                                src={this.props.artist.artist_image}
                                height="640"
                                width="640"
                            />
                        ) : null
                    }
                    content={<p>{this.props.artist.artist_title}</p>}
                    footer={null}
                />
                {this.state.modal_is_open && this.state.artist_details !== null ?
                    <Modal onclose={this.toggleModal}>
                        <ArtistDetails artist={this.props.artist} artist_details={this.state.artist_details} />
                    </Modal> : null
                }
            </Auxillary>
        );
    }
};

export default Artist;
