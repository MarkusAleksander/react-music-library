import React, { Component } from "react";
import Album from "../../components/Albums/Album/Album";

class AddNewMusic extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-6-mobile is-4-tablet is-6-desktop">
                            <form></form>
                        </div>
                        <Album
                            layoutClassOptions={
                                "column is-6-mobile is-4-tablet is-3-desktop"
                            }
                            editable={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewMusic;
