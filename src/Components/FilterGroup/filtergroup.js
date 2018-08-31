import React from 'react';
import PropTypes from 'prop-types';
import './filtergroup.css';

import CheckItem from '../CheckItem/checkitem';

const FilterGroup = (props) => {

    let sortedNames = props.items.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    })

    return (
        <div className={"filtergroup-container"}>
            <h2 className={"filtergroup-title"}>{props.title}</h2>
            { (props.toggleAll) ?
                <CheckItem
                    active={props.allState}
                    title={"All"}
                    callback={()=>{props.toggleAll()}}/> : null}
            <div className={(props.columns) ? "filtergroup-toggle-container" : "filtergroup-basic"}>
                { sortedNames.map((item, i)=>(
                    <CheckItem
                        key={i}
                        active={props.states[i]}
                        title={item}
                        callback={()=>{props.toggleItem(i)}}
                    />
                ))}
            </div>
        </div>
    )
};

FilterGroup.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    toggleItem: PropTypes.func.isRequired,
};

export default FilterGroup;



