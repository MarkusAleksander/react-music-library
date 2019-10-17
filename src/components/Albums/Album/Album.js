import React from 'react';
import './album.css';

const Album = (props) => {
    return (
        <div className={'album__item has-background-grey-white has-text-centered has-text-black ' + props.layoutClassOptions}>
            <div className="card">
                {
                    props.removeAlbumClick ?
                        <div onClick={props.removeAlbumClick} className="card-delete-btn"></div>
                        : null
                }

                <div className="card-image">
                    <img alt={props.title} src="https://dummyimage.com/820/b5b5b5/fff.jpg" />
                </div>
                <div className="card-content">
                    <p className="is-size-6-touch is-size-5-desktop">{props.title}</p>
                    <p className="is-size-7-touch is-size-6-desktop">{props.artist}</p>
                </div>
                <footer onClick={props.changeOwnedDataClick} className={"card-footer" + (props.changeOwnedDataClick ? ' card-footer--selectable' : '') + (props.owned ? ' has-background-primary has-text-black' : ' has-background-danger has-text-white')}>
                    <p className="card-footer-item is-size-7-mobile is-size-6-tablet">
                        Album status: {props.owned ? 'Owned' : 'Not Owned'}
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Album;
