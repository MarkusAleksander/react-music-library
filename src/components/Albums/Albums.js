import React from 'react';
import Album from './Album/Album';
//import './Albums.css';

//import AlbumData from '../../data/albums';
//import ArtistData from '../../data/artists';

/*class Albums extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albumData: this.props.albumData || [],
            artistData: this.props.artistData || [],
        }

        this.updateAlbumOwnedState = this.updateAlbumOwnedState.bind(this);
    }

    updateAlbumOwnedState = (albumID) => {

        let albumIndex = this.state.albumData.findIndex(a => {
            return a.id === albumID;
        });

        let album = {
            ...this.state.albumData[albumIndex]
        }

        album.owned = !album.owned;

        const newAlbumData = [...this.state.albumData];
        newAlbumData[albumIndex] = album;

        this.setState({
            albumData: newAlbumData
        });
    }

    createAlbumItem = (albumId) => {
        let album = this.state.albumData.find(el => {
            return el.id === albumId;
        });
        let artist = this.state.artistData.find(el => {
            return el.id === album.artistId;
        })

        return <Album key={album.id} artist={artist.artist} title={album.title} owned={album.owned} click={() => this.updateAlbumOwnedState(album.id)}></Album>
    }

    render() {
        return (
            <div className="album__list columns is-multiline is-vcentered" >
                {
                    this.state.albumData.length > 0 ?
                        this.state.albumData.map((album) => this.createAlbumItem(album.id))
                        :
                        <p>No Albums to show!</p>
                }
            </div>
        )
    }
}
*/

const Albums = (props) => (
    props.albums.length > 0 ?
        <div className="album__list columns is-multiline is-vcentered">
            {
                props.albums.map((album) => (
                    <Album key={album.id} artistId={album.artistId} title={album.title} owned={album.owned} /* click={() => this.updateAlbumOwnedState(album.id)} */></Album>
                ))
            }
        </div>
        :
        <p>No Albums to show!</p>
)

export default Albums;
