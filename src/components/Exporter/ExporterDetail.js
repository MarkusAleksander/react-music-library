import React from 'react';
import './Exporter.css';

const ExporterDetail = (props) => {

    const details = props.details.map((obj) => {
        return (
            <p className="exported-detail__copy" key={obj.id}>
                {
                    JSON.stringify(obj).replace(/([,]+)/g, ",\n")
                }
            </p>
        )
    });

    return (
        props.show ?
            <div className="exported-detail__overlay">
                <div className="exported-detail__content">
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={props.onButtonClick}>Close</button>
                        </div>
                    </div>
                    {details}
                </div>
            </div>
            : null
    )

}

export default ExporterDetail;
