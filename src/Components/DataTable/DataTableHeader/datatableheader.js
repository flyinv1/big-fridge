import React from 'react';
import './datatableheader.css';

const DataTableHeader = (props) => {

    let titles = ["Name", "Type", "Store", "Purchase Date", "Expiration Date", "Quantity"];

    return (
        <tr className={"datatableheader"}>
            { titles.map((title, index) => (
                <th
                    key={index}
                    className={"tableheader_" + index + " " + ((index === props.selectedIndex) ? "tableheader-active" : "")}
                    onClick={props.callback.bind(this, index)}>
                    { title }
                </th>
            ))}
        </tr>
    )
};

export default DataTableHeader;