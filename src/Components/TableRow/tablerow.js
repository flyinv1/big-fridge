import React from 'react';
import PropTypes from 'prop-types';
import './tablerow.css';

const TableRow = (props) => {
    return (
        <tr className={"tablerow-container"}>
            <td className={"tablerow-name"}>{props.name}</td>
            <td className={"tablerow-type"}>{props.type}</td>
            <td className={"tablerow-store"}>{props.store}</td>
            <td className={"tablerow-purchase"}>{props.purchase}</td>
            <td className={"tablerow-exp"}>{props.exp}</td>
            <td className={"tablerow-quantity"}>{props.quantity}</td>
        </tr>
    )
};

TableRow.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    purchase: PropTypes.string.isRequired,
    exp: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
};

export default TableRow;