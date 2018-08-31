import React from 'react';
import PropTypes from 'prop-types';
import './numentry.css';

import '../Interactable/interactable';
import Interactable from "../Interactable/interactable";

const NumEntry = (props) => {

    return (
        <Interactable onClick={()=>{}}>
            <input
                className={"pageentry-input"}
                type={"number"}
                placeholder={props.placeholder}
                onKeyUp={(e)=>{
                    if (!props.updateOnChange) {
                        if (e.key === "Enter") {
                            let reg = RegExp("^[0-9]");
                            if (reg.test(e.target.value)) {
                                let num = parseInt(e.target.value);
                                props.callback(num);
                            }
                        }
                    }
                }}
                onChange={(e)=>{
                    if (props.updateOnChange) {
                        let reg = RegExp("^[0-9]");
                        if (reg.test(e.target.value) || e.target.value === "") {
                            let num = parseInt(e.target.value);
                            props.callback(num);
                        }
                    }
                }}
            />
        </Interactable>
    )
};

NumEntry.propTypes = {
    callback: PropTypes.func.isRequired,
};

export default NumEntry;

