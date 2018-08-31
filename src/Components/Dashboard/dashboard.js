import React, { Component } from 'react';
import './dashboard.css';

import ControlPanel from '../ControlPanel/controlpanel';
import DataTable from '../DataTable/datatable';
import Visuals from "../Visuals/visuals";

import {
    retreiveAndSortData,
    retrieveHighlights
} from "../../Manager/manager";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    toggleDataDrawer(state) {
        this.props.toggleDrawer(state)
    }

    getChartData(filters) {
        return retreiveAndSortData(filters, this.props.selectedIndex, "purchaseData", true).map((obj, i) => {
            let newObj = Object.assign({}, obj);
            newObj.purchaseDate = newObj.purchaseDate.slice(0, 10);
            return newObj;
        });
    }

    render() {

        let pageLim = Math.ceil(this.props.data.length / this.props.tableLim).toFixed(0);
        let dataSource="Fridge_" + this.props.selectedIndex.toString();

        let chartData = this.getChartData(this.props.activeFilters);

        return (
            <div className={"dashboard-container"}>
                <Visuals highlights={retrieveHighlights(chartData, this.props.dateRange[1])} data={chartData} dateRange={this.props.dateRange}/>
                <ControlPanel
                    page={this.props.page}
                    pageLim={pageLim}
                    tableLim={this.props.tableLim}
                    dataSource={dataSource}
                    filters={this.props.filters}
                    dateRange={this.props.dateRange}
                    updateDateRange={this.props.updateDateRange}
                    toggleDrawer={this.toggleDataDrawer.bind(this)}
                    updateTableLim={this.props.updateTableLim}
                    updatePage={this.props.updatePage}
                    ascending={this.props.ascending}
                    toggle={this.props.toggleAscension}
                />
                <DataTable
                    data={this.props.data}
                    range={{
                        start: this.props.page * this.props.tableLim,
                        end: this.props.page * this.props.tableLim + this.props.tableLim,
                    }}
                    sortMethodIndex={this.props.sortMethodIndex}
                    updateSortMethodIndex={this.props.updateSortMethodIndex}
                />
            </div>
        )
    }

}