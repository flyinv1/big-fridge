import React from 'react';
import PropTypes from 'prop-types';
import './quantityselector.css';

import '../Interactable/interactable';
import Interactable from "../Interactable/interactable";

const QuantityEntry = (props) => {

    return (
        <Interactable onClick={()=>{}}>
            <input
                className={"pageentry-input"}
                type={"number"}
                placeholder={props.placeholder}
                value={props.value}
                onBlur={(e)=>{
                    let reg = RegExp("^[0-9]");
                    if (reg.test(e.target.value)) {
                        let num = parseInt(e.target.value);
                        props.entrycallback(num);
                    }
                }}
                onKeyUp={(e)=>{
                    if (e.key === "Enter") {
                        let reg = RegExp("^[0-9]");
                        if (reg.test(e.target.value)) {
                            let num = parseInt(e.target.value);
                            props.entrycallback(num);
                        }
                    }
                }}
                onChange={(e)=>{
                    if (props.updateOnChange) {
                        let reg = RegExp("^[0-9]");
                        if (reg.test(e.target.value) || e.target.value === "") {
                            let num = parseInt(e.target.value);
                            props.changecallback(num);
                        }
                    }
                }}
            />
        </Interactable>
    )
};

QuantityEntry.propTypes = {
    changecallback: PropTypes.func.isRequired,
    entrycallback: PropTypes.func.isRequired,

};

export default QuantityEntry;

