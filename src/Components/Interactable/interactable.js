import React from 'react';
import PropTypes from 'prop-types';
import './interactable.css';

const Interactable = (props) => {

    return (
        <div className={"interactable-container"} onClick={props.onClick}>
            {props.children}
        </div>
    )

};

Interactable.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Interactable;