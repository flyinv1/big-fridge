import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './quantityselector.css';

import Checkbox from '../Checkbox/checkbox';
import QuantityEntry from "./quantityentry";

const QuantitySelector = (props) => {

    return (
        <div className={"quantityselector-container"}>
            <Checkbox active={props.active} callback={props.callback}/>
            <QuantityEntry updateOnChange={true} changecallback={props.updateMin} entrycallback={props.setMin} placeholder={"Min"} value={props.minValue}/>
            <QuantityEntry updateOnChange={true} changecallback={props.updateMax} entrycallback={props.setMax} placeholder={"Max"} value={props.maxValue}/>
        </div>
    )

};

QuantitySelector.propTypes = {
    active: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    updateMin: PropTypes.func.isRequired,
    updateMax: PropTypes.func.isRequired,
};

export default QuantitySelector;