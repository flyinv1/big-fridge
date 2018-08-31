import React from 'react';
import PropTypes from 'prop-types';
import './dateselector.css';

import Interactable from '../Interactable/interactable';

const DateSelector = (props) => {
    return (
        <Interactable onClick={()=>{}}>
            <input
                className={"dateselector-input"}
                type={"date"}
                value={props.value}
                onChange={(e)=>{props.changecallback(e)}}
                onKeyUp={(e)=>{
                    if (e.key === "Enter") {
                        props.entrycallback(e)
                    }
                }}
                onBlur={(e)=>{props.entrycallback(e)}}
                onSelect={(e)=>{ props.entrycallback(e) }}
            />
        </Interactable>
    )
};

DateSelector.propTypes = {
    value: PropTypes.string,
    changecallback: PropTypes.func.isRequired,
    entrycallback: PropTypes.func.isRequired,
};

export default DateSelector;