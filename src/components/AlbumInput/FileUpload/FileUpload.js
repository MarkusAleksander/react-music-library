import React from 'react';
import ReactFilestack from 'filestack-react';
import uploadAPIData from './../../../data/uploadapi.local.js';

const FileUpload = (props) => {
    return (
        <div className="field">
            <div className="control">

                <ReactFilestack
                    apikey={uploadAPIData.key}
                    componentDisplayMode={{
                        type: 'button',
                        customText: "Upload an Image",
                        customClass: "button"
                    }}
                    onSuccess={(res) =>
                        props.onChange(res)
                    }
                    onError={(error) => { console.log(error); }}
                />

            </div>
        </div>
    )
}

export default FileUpload;
