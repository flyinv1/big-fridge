import React, { Component } from 'react';
import './datatable.css';

import TableRow from '../TableRow/tablerow.js';
import DataTableHeader from "./DataTableHeader/datatableheader";

import {
    getDataRange,
} from "../../Manager/manager";

import {
    cleanUpDate,
} from "../../Manager/dateUtil";

export default class DataTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let data = getDataRange(this.props.data, this.props.range.start, this.props.range.end);

        return (
            <div className={"datatable-container"}>
                <table className={"datatable"}>
                    <thead>
                        <DataTableHeader
                            selectedIndex={this.props.sortMethodIndex}
                            callback={this.props.updateSortMethodIndex}
                        />
                    </thead>
                    <tbody>
                        { (data.length > 0) ? data.map((object, i) => (
                            <TableRow
                                key={i}
                                name={object.name}
                                type={object.type}
                                store={object.store}
                                purchase={cleanUpDate(object.purchaseDate)}
                                exp={cleanUpDate(object.expirationDate)}
                                quantity={object.quantity}/>
                            )) :
                            <tr className={"datatable-empty-row"}>
                                <td colSpan={6} className={"datatable-empty"}>No data match that critera.</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}