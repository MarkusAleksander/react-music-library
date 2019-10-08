import React from 'react';
import './album.css';

const Album = (props) => {
    return (
        <div onClick={props.click} className='album__item column is-12-mobile is-6-tablet is-3-desktop has-background-grey-white has-text-black' onClick={props.click}>
            <div className="card">
                <div className="card-image">
                    <img alt={props.title} src="https://2fnwas1oea9y31r31yme9a19-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/Ihsahn-820x820.jpg" />
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
