import React from 'react';
import PropTypes from 'prop-types';
import './pagebutton.css';

import Interactable from '../Interactable/interactable.js';

import indicator_left from '../../img/indicator_left.png';
import indicator_right from '../../img/indicator_right.png';

const PageButton = (props) => {
    let source = (props.forward) ? indicator_right : indicator_left;
    let prompt = (props.forward) ? "Next" : "Back";

    return (
        <Interactable onClick={props.onClick}>
            {(props.forward) ?
                <div className={"pagebutton-container"}>
                    <img src={source} alt={""} className={"pagebutton-img"}/>
                </div>
                :
                <div className={"pagebutton-container"}>
                    <img src={source} alt={""} className={"pagebutton-img"}/>
                </div>}
        </Interactable>
    )
};

PageButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    forward: PropTypes.bool.isRequired,
};

export default PageButton;


