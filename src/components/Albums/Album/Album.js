import React, { Component } from 'react';
import './album.css';
import AlbumInput from './../../AlbumInput/AlbumInput.js';

class Album extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    render() {

    return (

        <div className={'album__item has-background-grey-white has-text-centered has-text-black ' + this.props.layoutClassOptions}>
            <div className="card">
                {
                    this.props.removeAlbumClick ?
                        <div onClick={this.props.removeAlbumClick} className="card-delete-btn"></div>
                        : null
                }
                {
                    this.props.editable ?
                        <div onClick={this.toggleEdit} className="card-edit-btn">
                            <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                width="512px"
                                height="512px"
                                viewBox="0 0 512 512"
                                enableBackground="new 0 0 512 512"
                                xmlSpace="preserve">
                                <path
                                    fill="#010101"
                                    d="M85.965,312.875l113.156,113.188l271.531-271.547L357.496,41.375L85.965,312.875z M380.121,109.266
                                    L153.871,335.5l-22.625-22.625l226.25-226.234L380.121,109.266z M470.652,18.75l22.625,22.625c24.969,24.984,24.969,65.516,0,90.516
                                    L380.121,18.75C405.121-6.25,445.652-6.25,470.652,18.75z M167.496,439.688L-0.004,512l72.313-167.5L167.496,439.688z"/>
                            </svg>
                        </div>
                        : null
                }

                <div className="card-image">
                    <img alt={this.props.title} src={this.props.image} />
                </div>
                <div className="card-content">
                    <p className="is-size-6-touch is-size-5-desktop">{this.props.title}</p>
                    <p className="is-size-7-touch is-size-6-desktop">{this.props.artist}</p>
                </div>
                <footer onClick={this.props.changeOwnedDataClick} className={"card-footer" + (this.props.changeOwnedDataClick ? ' card-footer--selectable' : '') + (this.props.owned ? ' has-background-primary has-text-black' : ' has-background-danger has-text-white')}>
                    <p className="card-footer-item is-size-7-mobile is-size-6-tablet">
                        Album status: {this.props.owned ? 'Owned' : 'Not Owned'}
                    </p>
                </footer>
            </div>
            {
                this.state.isEditing ?
                    <div class="edit-album">
                        <div class="edit-album__overlay"></div>
                        <div class="edit-album__container">
                            <button className="button is-primary" onClick={this.toggleEdit}>Close</button>
                            <AlbumInput></AlbumInput>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}
}

export default Album;
