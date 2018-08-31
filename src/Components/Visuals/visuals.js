import React, { Component } from 'react';
import './visuals.css';
import {Bar} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import DataHighlight from '../DataHighlight/datahighlight';
import CheckItem from '../CheckItem/checkitem.js';

import {
    sortExpiredData,
    setExpiredChartData,
} from "./Charting/chartConfiguration";

import data from "../../data/dataUtil.js";

export default class Visuals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayLegend: true,
        }
    }

    render() {

        defaults.global.legend.display = (this.state.displayLegend);
        let sortedData = sortExpiredData(this.props.data, this.props.dateRange);
        var arr = sortedData.goodData.concat(sortedData.expiredData);
        var labelArray = [];

        console.log(sortedData);

        labelArray = arr.map((obj) => { return obj.x });

        labelArray.sort((a, b) => {
            return (a !== b) ? (a > b) ? 1 : -1 : 0;
        });

        labelArray = [ ... new Set(labelArray) ];

        let chartAttributes = setExpiredChartData(sortedData, labelArray);

        const labels = ["Items Purchased", "Expired"];
        return (
            <div className={"visuals-container"}>
                <div className={"highlights-container"}>
                    <h2 className={"visuals-title"}>{"Overview"}</h2>
                    {this.props.highlights.map((value, i) => (
                        <DataHighlight key={i} value={value} label={labels[i]}/>
                    ))}
                    {/*<h2 className={"chart-toggles-title"}>{"Chart"}</h2>*/}
                    {/*<div className={"chart-toggles"}>*/}
                        {/*{ keys.map((key, i) => (*/}
                            {/*<CheckItem*/}
                                {/*key={i}*/}
                                {/*active={(this.state.index === i)}*/}
                                {/*title={keys[i]}*/}
                                {/*callback={this.updateKeyIndex.bind(this, i)}/>*/}
                        {/*))}*/}
                    {/*</div>*/}
                </div>
                <div className={"chart-container"}>
                    <h2 className={"visuals-title"}>{"Purchased"}</h2>
                    <div className={"chart-wrapper"}>
                        <div className={"chart-shrinkwrap"}>
                            <Bar data={chartAttributes} options={chartAttributes.options} width={600} height={275} maintainAspectRatio={false}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

