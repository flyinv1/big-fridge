import React, { Component } from 'react';
import './controlpanel.css';

import Interactable from '../Interactable/interactable';
import TextToggle from '../TextToggle/texttoggle';
import PageButton from '../PageButton/pagebutton';
import NumEntry from '../NumEntry/numentry';
import IndicatorButton from '../IndicatorButton/indicatorbutton';
import ControlGroup from '../ControlGroup/controlgroup';
import DateSelector from "../DateSelector/dateselector";

import ascending from '../../img/ascending.png';
import descending from '../../img/descending.png';
import arrow from '../../img/arrow.png';

import {
    convertToCleanString,
} from "../../Manager/dateUtil";

export default class ControlPanel extends Component {

    constructor(props) {
        super(props);

        let date = new Date();
        let prevDate = new Date();

        this.state = {
            min: this.props.dateRange[0],
            max: this.props.dateRange[1] ,
        };

    }

    updateDate(date, key) {
        this.setState({
            [key]: date,
        })
    }

    validateDateSubmission() {
        this.props.updateDateRange(this.state.min, this.state.max);
    }

    render() {
        return (
            <div className={"controlpanel-container"}>
                <div className={"controlpanel-left"}>
                    <ControlGroup title={"Data Source"}>
                        <IndicatorButton callback={()=>{this.props.toggleDrawer("data")}} prompt={this.props.dataSource}/>
                    </ControlGroup>
                    <ControlGroup title={"Filter Data"}>
                        <IndicatorButton callback={()=>{this.props.toggleDrawer("")}} prompt={this.props.filters}/>
                    </ControlGroup>
                    <ControlGroup title={"Start Date"}>
                        <DateSelector
                            value={this.state.min}
                            changecallback={(e)=>{
                                this.updateDate(e.target.value, "min")
                            }}
                            entrycallback={(e)=>{
                                this.validateDateSubmission(e.target.value, "min")
                            }}
                        />
                    </ControlGroup>
                    <img src={arrow} alt={""} className={"controlpanel-date-arrow-img"}/>
                    <ControlGroup title={"End Date (not inclusive)"}>
                        <DateSelector
                            value={this.state.max}
                            changecallback={(e)=>{
                                this.updateDate(e.target.value, "max")
                            }}
                            entrycallback={(e)=>{
                                this.validateDateSubmission(e.target.value, "max")
                            }}/>
                    </ControlGroup>
                </div>
                <div className={"controlpanel-right"}>
                    <ControlGroup title={"Items per page"}>
                        <NumEntry
                            value={this.props.tableLim}
                            placeholder={this.props.tableLim}
                            updateOnChange={true}
                            callback={this.props.updateTableLim}/>
                    </ControlGroup>
                    <ControlGroup title={"Sort"}>
                        <TextToggle
                            source={(this.props.ascending) ? ascending : descending}
                            toggle={this.props.toggle}
                            state={(this.props.ascending) ? "" : ""}/>
                    </ControlGroup>
                    <ControlGroup title={"Page " + (this.props.page + 1) + " of " + (this.props.pageLim)}>
                        <PageButton onClick={()=>{this.props.updatePage(false)}} forward={false}/>
                        <NumEntry
                            value={this.props.page + 1}
                            placeholder={"Page"}
                            updateOnChange={false}
                            callback={(num)=>{
                                this.props.updatePage(null, num);
                            }}/>
                        <PageButton onClick={()=>{this.props.updatePage(true)}} forward={true}/>
                    </ControlGroup>
                </div>
            </div>
        )
    }
}