import React, { Component } from "react";

class Track extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing_audio: false,
            has_loaded: false,
            is_loading: false
        };

        this.audioRef = React.createRef();
    }

    handleCanPlay = () => {
        console.log("[handleCanPlay]");
        // * event listener no longer needed
        this.audioRef.current.removeEventListener("canplay", this.handleCanPlay);
        this.setState({
            is_loading: false,
            has_loaded: true
        });
    }

    toggleAudio = () => {
        console.log("[toggleAudio]");
        if (!this.state.has_loaded) {
            this.setState({
                is_loading: true
            }, () => {
                // * listen for when audio can play
                this.audioRef.current.addEventListener("canplay", this.handleCanPlay);
                this.setState(
                    {
                        playing_audio: !this.state.playing_audio,
                    },
                    this.handleAudioStatus
                );
            });
        }
        if (this.state.has_loaded) {
            this.setState(
                {
                    playing_audio: !this.state.playing_audio,
                },
                this.handleAudioStatus
            );
        }
    };

    handleAudioStatus = () => {
        if (this.state.playing_audio) {
            this.audioRef.current.play();
        } else {
            this.audioRef.current.pause();
        }
    };

    render() {

        const icon_style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate3d(-50%, -50%, 0)",
            zIndex: "1",
            fontSize: "2.4em",
            color: "#fff"
        };

        return (
            <div className="track" onClick={() => { return this.props.track.preview_url ? this.toggleAudio() : null }}>
                <div className="columns is-mobile is-vcentered">
                    <div
                        className="column is-one-third"
                        style={{ position: "relative" }}
                    >
                        {this.props.track.album.images &&
                            this.props.track.album.images[0] ? (
                                <img
                                    alt=""
                                    src={this.props.track.album.images[0].url}
                                />
                            ) : null}
                        {this.props.track.preview_url ? (
                            <i
                                className={this.state.playing_audio ? (this.state.is_loading ? "fas fa-truck-loading" : "fas fa-pause") : "far fa-play-circle"}
                                style={icon_style}
                            ></i>
                        ) : null}
                    </div>
                    <div className="column is-two-thirds">
                        <p className="title is-size-7">
                            {this.props.track.name}
                        </p>
                        <p className="subtitle is-size-7">
                            {this.props.track.album.name}
                        </p>
                    </div>
                    {this.props.track.preview_url ? (
                        <audio
                            style={{ display: "none" }}
                            src={this.props.track.preview_url}
                            preload={"none"}
                            ref={this.audioRef}
                        ></audio>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Track;
