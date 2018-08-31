import React from 'react';
import PropTypes from 'prop-types';
import './fullbutton.css';


import Interactable from '../Interactable/interactable';

const FullButton = (props) => {
    return (
        <Interactable onClick={props.onClick}>
            <div className={"fullbutton-inner-container"}>
                <p>{props.title}</p>
                <h5 className={"fullbutton-focus"}>
                    {props.focus}
                </h5>
            </div>
        </Interactable>
    )
};

FullButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    focus: PropTypes.string,
};

export default FullButton;