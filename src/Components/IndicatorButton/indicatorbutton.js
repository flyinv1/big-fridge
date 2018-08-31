import React from 'react';
import PropTypes from 'prop-types';
import './indicatorbutton.css';

import Interactable from '../Interactable/interactable';

import indicator from '../../img/indicator_right.png';

const IndicatorButton = (props) => {
    return (
        <Interactable onClick={props.callback}>
            <p>{props.prompt}</p>
            <img src={indicator} className={"indicatorbutton-img"} alt={""}/>
        </Interactable>
    )
};

IndicatorButton.propTypes = {
    callback: PropTypes.func.isRequired,
    prompt: PropTypes.node,
};

export default IndicatorButton;