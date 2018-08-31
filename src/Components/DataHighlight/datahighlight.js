import React from 'react';
import './datahighlight.css';

const DataHighlight = (props) => {

    return (
    <div className={"datahighlight-container"}>
        <h1 className={"datahighlight-value"} style={props.textStyle}>
            {props.value}
        </h1>
        <h3 className={"datahighlight-label"}>
            {props.label}
        </h3>
    </div>
    )
};

export default DataHighlight;