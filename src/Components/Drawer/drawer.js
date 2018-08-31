import React, { Component } from 'react';
import './drawer.css';

import Checkbox from '../Checkbox/checkbox';
import CheckItem from '../CheckItem/checkitem';
import FullButton from '../FullButton/fullbutton';
import FilterGroup from '../FilterGroup/filtergroup';
import QuantitySelector from '../QuantitySelector/quantityselector';

import {
    names,
    stores,
    types,
} from "../../data/dataUtil";

import {
    lengthArr,
    getTermSet,
} from "../../Manager/manager";
import Interactable from "../Interactable/interactable";

export default class Drawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            names: [],
            stores: [],
            types: [],
            allnames: true,
        }
    }

    componentDidMount() {
        let namesfilter = new Array(names.length).fill(true);
        let storesfilter = new Array(stores.length).fill(true);
        let typesfilter = new Array(types.length).fill(true);

        this.setState({
            names: namesfilter,
            stores: storesfilter,
            types: typesfilter,
            allnames: true,
            quantity: false,
            min: 1,
            max: 10,
        })
    }

    selectData(index) {
        this.props.toggleDrawer("data");
        this.props.loadNewTableData(index);
    }

    toggleValue(selector, index) {
        let arr = this.state[selector];
        arr[index] = !arr[index];
        this.setState({
            [selector]: arr,
        })
    }

    toggleAllNames() {
        let arr = this.state.names;
        arr.fill(!this.state.allnames);
        this.setState({
            names: arr,
            allnames: !this.state.allnames,
        })
    }

    updateFilter() {
        let arrays = {
            name: getTermSet(this.state.names, names),
            store: getTermSet(this.state.stores, stores),
            type: getTermSet(this.state.types, types),
            quantity: (this.state.quantity) ? [this.state.min, this.state.max] : [0, 10],
        };
        this.props.toggleDrawer(this.props.state);
        this.props.updateFilter(arrays);
    }

    render() {

        let drawer_render_state = (this.props.drawerVisible) ? "drawer-container" : "drawer-container drawer-container-hidden";

        var dataSets = [];
        for (var i=0; i<lengthArr.length; i++) { dataSets.push("Fridge_"+i.toString()) }

        return (
            <div className={drawer_render_state}>
                <div className={"drawer-inner-container"}>
                    { (this.props.state === "data") ?
                        <div className={"drawer-data-container"}>
                            <h2 className={"drawer-header"}>{"Select Data Source"}</h2>
                            { dataSets.map((name, i) => (
                                <FullButton
                                    key={i}
                                    onClick={this.selectData.bind(this, i)}
                                    title={dataSets[i]}
                                    focus={lengthArr[i] + " Items"}/>
                            ))}
                        </div>
                        :
                        <div className={"drawer-filter-container"}>
                            <div className={"drawer-filter-toggle-container"}>
                                <h3 className={"drawer-header"}>Quantity</h3>
                                <QuantitySelector
                                    active={this.state.quantity}
                                    callback={()=>{ this.setState({ quantity: !this.state.quantity })}}
                                    updateMin={(num)=>{ this.setState({ min: num }) }}
                                    updateMax={(num)=>{ this.setState({ max: num }) }}
                                    setMin={(num)=>{
                                        this.setState({ min: (num >= 0 && num <= this.state.max) ? num : 0 })
                                    }}
                                    setMax={(num)=>{
                                        this.setState({ max: (num >= this.state.min) ? num : 10 })
                                    }}
                                    minValue={this.state.min}
                                    maxValue={this.state.max}
                                />
                                <FilterGroup title={"Store"} items={stores} states={this.state.stores} toggleItem={this.toggleValue.bind(this, "stores")}/>
                                <FilterGroup title={"Type"} items={types} states={this.state.types} toggleItem={this.toggleValue.bind(this, "types")}/>
                                <FilterGroup
                                    title={"Items"}
                                    columns={true}
                                    items={names}
                                    states={this.state.names}
                                    toggleItem={this.toggleValue.bind(this, "names")}
                                    toggleAll={this.toggleAllNames.bind(this)}
                                    allState={this.state.allnames}
                                />
                            </div>
                        </div>
                    }
                </div>
                <div>
                    { (this.props.state !== "data") ?
                        <div className={"drawer-filter-confirm-bar"}>
                            <Interactable onClick={this.updateFilter.bind(this)}>
                                <p className={"drawer-filter-confirm-button"}>{"Apply Filter"}</p>
                            </Interactable>
                        </div> : null }
                </div>
            </div>
        )

    }

}