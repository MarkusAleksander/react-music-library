import React from "react";
import "./album.css";
import Auxillary from "../../../hoc/Auxillary";

// class Album extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             isEditing: false,
//             album: {
//                 owned: props.owned,
//                 title: props.title,
//                 artist: props.artist,
//                 image: props.image,
//                 artistId: props.artistId,
//             },
//         };
//     }

//     toggleEdit = () => {
//         this.setState({
//             isEditing: !this.state.isEditing,
//         });
//     };

//     editAlbum = () => {};

//     updateAlbum = (edit) => {
//         let editedAlbum = Object.assign(this.state.album, edit);

//         this.setState({
//             editedAlbum: editedAlbum,
//         });
//     };

//     render() {
//         return (
//             <div
//                 className={
//                     "album__item has-background-grey-white has-text-centered has-text-black " +
//                     this.props.layoutClassOptions
//                 }
//             >
//                 <article className="card">
//                     {this.props.editable ? (
//                         <Auxillary>
//                             {this.props.handleRemoveAlbum ? (
//                                 <div
//                                     onClick={this.props.handleRemoveAlbum}
//                                     className="card-delete-btn"
//                                 ></div>
//                             ) : null}
//                             <div
//                                 onClick={this.toggleEdit}
//                                 className="card-edit-btn"
//                             >
//                                 <svg
//                                     version="1.1"
//                                     id="Layer_1"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     xmlnsXlink="http://www.w3.org/1999/xlink"
//                                     x="0px"
//                                     y="0px"
//                                     width="512px"
//                                     height="512px"
//                                     viewBox="0 0 512 512"
//                                     enableBackground="new 0 0 512 512"
//                                     xmlSpace="preserve"
//                                 >
//                                     <path
//                                         fill="#010101"
//                                         d="M85.965,312.875l113.156,113.188l271.531-271.547L357.496,41.375L85.965,312.875z M380.121,109.266
//                                     L153.871,335.5l-22.625-22.625l226.25-226.234L380.121,109.266z M470.652,18.75l22.625,22.625c24.969,24.984,24.969,65.516,0,90.516
//                                     L380.121,18.75C405.121-6.25,445.652-6.25,470.652,18.75z M167.496,439.688L-0.004,512l72.313-167.5L167.496,439.688z"
//                                     />
//                                 </svg>
//                             </div>
//                         </Auxillary>
//                     ) : null}

//                     <div className="card-image">
//                         <img
//                             alt={this.state.album.title}
//                             src={this.state.album.image}
//                         />
//                     </div>

//                     <header className="card-content">
//                         <h2 className="is-size-6-touch is-size-5-desktop">
//                             {this.state.album.title}
//                         </h2>
//                         <p className="is-size-7-touch is-size-6-desktop">
//                             {this.state.album.artist}
//                         </p>
//                     </header>

//                     <footer
//                         onClick={
//                             this.props.editable
//                                 ? this.props.handleChangedOwned
//                                 : null
//                         }
//                         className={
//                             "card-footer" +
//                             (this.props.handleChangedOwned
//                                 ? " card-footer--selectable"
//                                 : "") +
//                             (this.state.album.owned
//                                 ? " has-background-primary has-text-black"
//                                 : " has-background-danger has-text-white")
//                         }
//                     >
//                         <p className="card-footer-item is-size-7-mobile is-size-6-tablet">
//                             Album status:{" "}
//                             {this.state.album.owned ? "Owned" : "Not Owned"}
//                         </p>
//                     </footer>
//                 </article>
//                 {this.state.isEditing ? (
//                     <div className="edit-album">
//                         <div className="edit-album__overlay"></div>
//                         <div className="edit-album__container">
//                             <button
//                                 className="button is-primary"
//                                 onClick={this.toggleEdit}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 ) : null}
//             </div>
//         );
//     }
// }

const album = (props) => {
    return (
        <div
            className={
                "album__item has-background-grey-white has-text-centered has-text-black " +
                props.layoutClassOptions
            }
        >
            <article className="card">
                {props.editable ? (
                    <Auxillary>
                        {props.handleRemoveAlbum ? (
                            <div
                                onClick={props.handleRemoveAlbum}
                                className="card-delete-btn"
                            ></div>
                        ) : null}
                        <div
                            // onClick={this.toggleEdit}
                            className="card-edit-btn"
                        >
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
                                xmlSpace="preserve"
                            >
                                <path
                                    fill="#010101"
                                    d="M85.965,312.875l113.156,113.188l271.531-271.547L357.496,41.375L85.965,312.875z M380.121,109.266
                                    L153.871,335.5l-22.625-22.625l226.25-226.234L380.121,109.266z M470.652,18.75l22.625,22.625c24.969,24.984,24.969,65.516,0,90.516
                                    L380.121,18.75C405.121-6.25,445.652-6.25,470.652,18.75z M167.496,439.688L-0.004,512l72.313-167.5L167.496,439.688z"
                                />
                            </svg>
                        </div>
                    </Auxillary>
                ) : null}

                <div className="card-image">
                    <img alt={props.title} src={props.image} />
                </div>

                <header className="card-content">
                    <h2 className="is-size-6-touch is-size-5-desktop">
                        {props.title}
                    </h2>
                    <p className="is-size-7-touch is-size-6-desktop">
                        {props.artist}
                    </p>
                </header>

                <footer
                    onClick={props.editable ? props.handleChangedOwned : null}
                    className={
                        "card-footer" +
                        (props.handleChangedOwned
                            ? " card-footer--selectable"
                            : "") +
                        (props.owned
                            ? " has-background-primary has-text-black"
                            : " has-background-danger has-text-white")
                    }
                >
                    <p className="card-footer-item is-size-7-mobile is-size-6-tablet">
                        Album status: {props.owned ? "Owned" : "Not Owned"}
                    </p>
                </footer>
            </article>
            {props.isEditing ? (
                <div className="edit-album">
                    <div className="edit-album__overlay"></div>
                    <div className="edit-album__container">
                        <button
                            className="button is-primary"
                            // onClick={this.toggleEdit}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default album;
