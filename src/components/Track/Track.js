import React, { Component } from "react";

class Track extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing_audio: false,
        };

        this.audioRef = React.createRef();
    }

    toggleAudio = () => {
        this.setState(
            {
                playing_audio: !this.state.playing_audio,
            },
            this.handleAudioStatus
        );
    };

    handleAudioStatus = () => {
        if (this.state.playing_audio) {
            this.audioRef.current.play();
        } else {
            this.audioRef.current.pause();
        }
    };

    render() {
        return (
            <div className="track" onClick={this.toggleAudio}>
                <div className="columns is-mobile">
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
                        {this.props.preview_url && !this.state.playing_audio ? (
                            <i
                                class="far fa-play-circle"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate3d(-50%, -50%, 0)",
                                    zIndex: "1",
                                }}
                            ></i>
                        ) : this.props.preview_url &&
                          this.state.playing_audio ? (
                            <i
                                class="fas fa-pause"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate3d(-50%, -50%, 0)",
                                    zIndex: "1",
                                }}
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
                            preload={"auto"}
                            ref={this.audioRef}
                        ></audio>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Track;
