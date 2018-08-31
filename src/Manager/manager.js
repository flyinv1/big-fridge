import data from "../data/dataUtil";

let keys = [
    "name",
    "type",
    "store",
    "purchaseDate",
    "expirationDate",
    "quantity",
];

var dataLengths = [];
for (var i=0; i<data.length; i++) {
    dataLengths.push(data[i].length)
}

export const lengthArr = dataLengths;


export function getDataset(index) {
    return data[index];
}


export function retreiveAndSortData(filters, dataIndex, keyIndex, ascending) {
    let key = keys[keyIndex];
    return data[dataIndex].filter((obj, i) => {
        return (filters.name.includes(obj.name))
    }).filter((obj, i) => {
        return (filters.type.includes(obj.type))
    }).filter((obj, i) => {
        return (filters.store.includes(obj.store))
    }).filter((obj, i) => {
        return (obj.quantity >= filters.quantity[0] && obj.quantity <= filters.quantity[1])
    }).filter((obj, i) => {
        let pd = Date.parse(obj.purchaseDate);
        let td1 = Date.parse(filters.date[0]);
        let td2 = Date.parse(filters.date[1]);
        return (pd >= td1 && pd <= td2)
    }).sort(function(a, b) {
        if (a[key] < b[key]) return (ascending) ? -1 : 1;
        if (a[key] > b[key]) return (ascending) ? 1 : -1;
        return 0;
    })
}

export function sortDatasetByKeyIndex(currentData, index, keyIndex, ascending) {
    var selectedData = currentData;
    let key = keys[keyIndex];
    selectedData.sort(function(a, b) {
        if (a[key] < b[key]) return (ascending) ? -1 : 1;
        if (a[key] > b[key]) return (ascending) ? 1 : -1;
        return 0;
    });
    return selectedData;
}


export function reverseDataSet(currentData) {
    return currentData.reverse();
}


export function getDataRange(arr, start, end) {
    return arr.slice(start, end);
}

export function getTermSet(boolArr, terms) {
    return terms.filter((obj, index) => {
        return (boolArr[index])
    })
}

export function filterData(data, terms, key) {
    return data.filter((obj, index) => {
        return (terms.includes(obj[key]));
    })
}

export function retrieveHighlights(currentData, targetDate) {
    let target = Date.parse(targetDate);
    var purchases = 0;
    currentData.map((obj, i) => {
        purchases += obj.quantity
    });

    let expiredItems = currentData.filter((obj, index) => {
        let objDate = Date.parse(obj.expirationDate);
        return (objDate <= target)
    });

    var expItems = 0;
    expiredItems.map((obj, i) => {
        expItems += obj.quantity;
    });

    return [
        purchases,
        expItems,
    ]
}

export function queryData(currentData, term) {
    if (term !== "") {
        return currentData.filter((obj) => {
            return Object.values(obj).includes(term.toString());
        })
    } else {
        return currentData;
    }
}


