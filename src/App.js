import React, { Component } from 'react';
import './App.css';
import './constants.css';

import MenuBar from './Components/MenuBar/menubar';
import SearchBar from './Components/SearchBar/searchbar';
import Dashboard from "./Components/Dashboard/dashboard";
import Drawer from "./Components/Drawer/drawer";

import {
    getDataset,
    reverseDataSet,
    sortDatasetByKeyIndex,
    getDataRange,
    filterData,
    retreiveAndSortData, retrieveHighlights, queryData,
} from './Manager/manager';

import {
    names,
    types,
    stores,
} from "./data/dataUtil";

class App extends Component {

    constructor() {
        super();

        let date = new Date();
        let prevDate = new Date();
        let start = new Date(prevDate.setDate(prevDate.getDate()-60)).toISOString().slice(0, 10);
        let end = date.toISOString().slice(0,10);

        this.state = {
            currentData: [],
            currentDatasetIndex: 0,
            sortMethodIndex: 3,
            ascending: true,
            page: 0,
            tableLim: 20,
            drawerVisible: false,
            drawerState: "data",
            nameFilter: names,
            typeFilter: types,
            storeFilter: stores,
            dateRange: [start, end],
            quantityRange: [0, 10],
        }
    }

    componentDidMount() {
        this.setState({
            currentData: sortDatasetByKeyIndex(getDataset(this.state.currentDatasetIndex), this.state.currentDatasetIndex, this.state.sortMethodIndex, this.state.ascending),
        }, () => {
            this.updateData();
        });
    }

    toggleDirection() {
        this.setState({
            currentData: reverseDataSet(this.state.currentData),
            ascending: !this.state.ascending,
        })
    }

    updateSortMethodIndex(index) {
        let ci = this.state.currentDatasetIndex;
        if (index !== this.state.sortMethodIndex) {
            this.setState({
                sortMethodIndex: index,
                currentData: sortDatasetByKeyIndex(this.state.currentData, ci, index, this.state.ascending),
            });
        }
    }

    updatePage(forward, num) {
        if (typeof(num) !== "undefined") {
            let pageNum = num - 1;
            let lastPage = Math.ceil(this.state.currentData.length / this.state.tableLim);
            if (pageNum >= 0 && pageNum < lastPage) {
                this.setState({
                    page: pageNum
                })
            }
        } else {
            var page = this.state.page;
            let lastPage = Math.ceil(this.state.currentData.length / this.state.tableLim);
            if (forward) {
                if (page < lastPage - 1) {
                    page += 1;
                }
            } else if (page > 0) {
                page -= 1;
            }
            this.setState({
                page: page
            })
        }
    }

    updateTableLim(num) {
        if (num >= 5 && num <= 500) {
            let lastPage = Math.ceil(this.state.currentData.length / num);
            if (lastPage - 1 < this.state.page) {
                this.updatePage(null, lastPage)
            }
            this.setState({
                tableLim: num,
            })
        }
    }

    toggleDrawer(state) {
        if (this.state.drawerState !== state) {
            this.setState({
                drawerState: state,
                drawerVisible: true,
            })
        } else {
            this.setState({
                drawerVisible: !this.state.drawerVisible,
                drawerState: state,
            })
        }
    }

    loadNewTableData(index) {
        this.setState({
            currentDatasetIndex: index,
        }, () => {
            this.updateData();
        })
    }

    updateDateRange(min, max) {
        this.setState({
            dateRange: [min, max],
        }, () => {
            this.updateData();
        })
    }

    updateFilter(arrays) {
        this.setState({
            nameFilter: arrays.name,
            typeFilter: arrays.type,
            storeFilter: arrays.store,
            quantityRange: arrays.quantity
        }, () => {
            this.updateData();
        });
    }

    updateData() {
        let filters = {
            name: this.state.nameFilter,
            type: this.state.typeFilter,
            store: this.state.storeFilter,
            quantity: this.state.quantityRange,
            date: this.state.dateRange,
        };

        this.setState({
            currentData: retreiveAndSortData(filters, this.state.currentDatasetIndex, this.state.sortMethodIndex, this.state.ascending),
        }, () => {
            this.updateTableLim(this.state.tableLim);
        });
    }

    updateSearchParameter(parameter) {
        let filters = {
            name: this.state.nameFilter,
            type: this.state.typeFilter,
            store: this.state.storeFilter,
            quantity: this.state.quantityRange,
            date: this.state.dateRange,
        };

        this.setState({
            currentData: queryData(retreiveAndSortData(filters, this.state.currentDatasetIndex, this.state.sortMethodIndex, this.state.ascending), parameter)
        }, () => {
            this.updateTableLim(this.state.tableLim);
        });
    }


    render() {

        let activeFilters = {
            name: this.state.nameFilter,
            type: this.state.typeFilter,
            store: this.state.storeFilter,
            quantity: this.state.quantityRange,
            date: this.state.dateRange,
        };

        return (
            <div className={"App"}>
                <MenuBar/>
                <div className={"app-dashboard-container"}>
                    <SearchBar updateSearchParameter={this.updateSearchParameter.bind(this)}/>
                    <Drawer
                        state={this.state.drawerState}
                        drawerVisible={this.state.drawerVisible}
                        toggleDrawer={this.toggleDrawer.bind(this)}
                        loadNewTableData={this.loadNewTableData.bind(this)}
                        updateFilter={this.updateFilter.bind(this)}
                    />
                    <Dashboard
                        activeFilters={activeFilters}
                        highlights={this.state.highlights}
                        page={this.state.page}
                        tableLim={this.state.tableLim}
                        ascending={this.state.ascending}
                        data={this.state.currentData}
                        filters={this.state.currentData.length}
                        selectedIndex={this.state.currentDatasetIndex}
                        sortMethodIndex={this.state.sortMethodIndex}
                        dateRange={this.state.dateRange}
                        updateDateRange={this.updateDateRange.bind(this)}
                        toggleDrawer={this.toggleDrawer.bind(this)}
                        updateTableLim={this.updateTableLim.bind(this)}
                        updatePage={this.updatePage.bind(this)}
                        toggleAscension={this.toggleDirection.bind(this)}
                        updateSortMethodIndex={this.updateSortMethodIndex.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default App;
