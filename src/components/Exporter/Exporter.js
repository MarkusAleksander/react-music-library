import React, { Component } from 'react';
import ExporterDetail from './ExporterDetail.js';
import './Exporter.css';

class Exporter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false
        }
    }

    toggleDisplay = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    }

    render() {

        return (
            <div class="exporter">
                <button className="button is-info" onClick={this.toggleDisplay}>Show {this.props.detailName} Details</button>
                {
                    this.state.showDetail ?
                        <ExporterDetail onButtonClick={this.toggleDisplay} details={this.props.data} show={true} />
                        : null
                }
            </div>
        )
    }
}

export default Exporter;
