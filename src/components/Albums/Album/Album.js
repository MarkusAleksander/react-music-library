import React from 'react';
import './album.css';

const Album = (props) => {

    return (
        <div className='album__item column is-12-mobile is-6-tablet is-3-desktop has-background-grey-white has-text-black' onClick={props.click}>
            <div className="card">
                <div className="card-image">
                    <img alt={props.title} src="https://img.discogs.com/kY7gI8ME4--Ca3fFhstO53rI8os=/fit-in/600x545/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4673226-1372439040-3438.jpeg.jpg" />
                </div>
                <div className="card-content">
                    <p className="is-size-5">{props.title}</p>
                    <p className="is-size-6">{props.artist}</p>
                </div>
                <footer className={"card-footer " + (props.owned ? 'has-background-primary has-text-black' : 'has-background-danger has-text-white')}>
                    <p className="card-footer-item">
                        Album status: {props.owned ? 'Owned' : 'Not Owned'}
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Album;
