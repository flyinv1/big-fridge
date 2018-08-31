import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.css';

const Checkbox = (props) => {

    let wrapper = (props.active) ? "checkbox-wrapper checkbox-wrapper-active" : "checkbox-wrapper";

    return (
        <div className={wrapper} onClick={props.callback}>
            { (props.active) ? <div className={"checkbox-check"}/> : null }
        </div>
    )
};

Checkbox.propTypes = {
    active: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
};

export default Checkbox;

