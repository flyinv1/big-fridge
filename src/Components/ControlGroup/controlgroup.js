import React from 'react';
import PropTypes from 'prop-types';
import './controlgroup.css';

const ControlGroup = (props) => {

    return (
        <div className={"controlgroup-container"}>
            <h1 className={"controlgroup-title"}>
                {props.title}
            </h1>
            <div className={"controlgroup-controls-wrapper"}>
                {props.children}
            </div>
        </div>
    )
};

ControlGroup.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ControlGroup;