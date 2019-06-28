import React, { Component } from 'react';
import './albumInput.css';

class AlbumInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            artist: '',
            owned: false
        }
    }

    titleChangeHandler = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    artistChangeHandler = (event) => {
        this.setState({
            artist: event.target.value
        })
    }

    ownedChangeHandler = (event) => {
        this.setState({
            owned: event.target.checked
        })
    }

    render () {
        return (
            <div>
                <p>{this.state.artist} - {this.state.title}</p>
                <label htmlFor="album-title">Album Title:</label>
                <input type="text" name="album-title" id="album-title" className="album__input album__input--text" onChange={this.titleChangeHandler} value={this.state.title} />
                <label htmlFor="album-artist">Album Artist:</label>
                <input type="text" name="album-artist" id="album-artist" className="album__input album__input--text" onChange={this.artistChangeHandler} value={this.state.artist} />
                <label htmlFor="album-owned">Album is Owned:</label>
                <input type="checkbox" name="album-owned" id="album-owned" className="album__input album__input--checkbox" onChange={this.ownedChangeHandler} value={this.state.owned} />
            </div>
        )
    }

}

export default AlbumInput;