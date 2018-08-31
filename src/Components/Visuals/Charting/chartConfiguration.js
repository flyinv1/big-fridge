import React from 'react';
import colors from '../colors';

export function sortExpiredData(data, dateRange) {

    var expiredData = [];
    var goodData = [];
    let currentDate = dateRange[1];

    data.map((obj, index) => {
        let expDate = obj.expirationDate.slice(0, 10);
        let pDate = obj.purchaseDate.slice(0, 10);

        if (Date.parse(obj.purchaseDate) >= Date.parse(dateRange[0]) && Date.parse(obj.purchaseDate) <= Date.parse(dateRange[1])) {
            if (Date.parse(expDate) <= Date.parse(currentDate)) {
                expiredData.push({
                    x: pDate,
                    y: obj.quantity,
                });
                goodData.push({
                    x: pDate,
                    y: 0,
                })
            } else {
                goodData.push({
                    x: pDate,
                    y: obj.quantity,
                });
                expiredData.push({
                    x: pDate,
                    y: 0,
                })
            }
        }
    });

    expiredData = flattenData(expiredData);
    goodData = flattenData(goodData);

    expiredData = expiredData.sort((a, b) => {
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    goodData = goodData.sort((a, b) => {
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    return {
        expiredData,
        goodData
    }
}

function flattenData(data) {

    for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length;) {
            if (data[i].x === data[j].x) {
                data[i].y += data[j].y;
                data.splice(j, 1);
            } else {
                j++;
            }
        }
    }
    return data;
}

export function setExpiredChartData(data, labels) {

    return  {
        labels: labels,
        datasets: [
            {
                label: "Expired Items",
                stack: "01",
                borderWidth: 1,
                backgroundColor: colors.lightblue,
                borderColor: colors.lightblue,
                hoverBackgroundColor: colors.red,
                hoverBorderColor: colors.red,
                data: data.expiredData
            },
            {
                label: "Edible Items",
                stack: "01",
                borderWidth: 1,
                backgroundColor: colors.blue,
                borderColor: colors.blue,
                hoverBackgroundColor: colors.dark_blue,
                hoverBorderColor: colors.dark_blue,
                data: data.goodData
            }
        ],
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: "#818181",
                    fontFamily: "Open Sans",
                    fontSize: 14,
                    fontWeight: 600,
                }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    // distribution: 'linear',
                    bounds: 'data',
                    ticks: {
                        autoSkip: true,
                        // source: 'data'
                        fontFamily: 'Open Sans',
                        fontSize: 14,
                        fontWeight: 300,
                        fontColor: "#AAAAAA",
                        // minRotation: 60,
                        autoSkipPadding: 15,
                    },
                    time: {
                        unit: 'day',
                        // unitStepSize: 1,
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        fontSize: 12,
                        fontFamily: "Open Sans",
                        fontWeight: 500,
                        fontColor: "#AAAAAA",
                    }
                }]
            }
        }
    }
}