import React from 'react';
import PropTypes from 'prop-types';
import './texttoggle.css';
import Interactable from '../Interactable/interactable.js';

const TextToggle = (props) => {
    return (
        <Interactable onClick={props.toggle}>
            <p className={"texttoggle-state"}>{props.state}</p>
            <img src={props.source} className={"texttoggle-img"} alt={""}/>
        </Interactable>
    )
};

TextToggle.propTypes = {
    toggle: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired,
};

export default TextToggle;