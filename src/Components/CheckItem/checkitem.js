import React from 'react';
import PropTypes from 'prop-types';
import './checkitem.css';

import Checkbox from '../Checkbox/checkbox';

const CheckItem = (props) => {
    return (
        <div className={"checkitem-container"} onClick={props.callback}>
            <Checkbox active={props.active} callback={()=>{}}/>
            <h3 className={"checkitem-title"}>{props.title}</h3>
        </div>
    )
};

CheckItem.propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
};


export default CheckItem;