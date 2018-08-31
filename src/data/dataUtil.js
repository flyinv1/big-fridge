import foodTypes from './foodTypes.json';
import data_0 from './data-0.json';
import data_1 from './data-1.json';
import data_2 from './data-2.json';
import data_3 from './data-3.json';
import data_4 from './data-4.json';
import data_5 from './data-5.json';
import data_6 from './data-6.json';
import data_7 from './data-7.json';
import data_8 from './data-8.json';
import data_9 from './data-9.json';

let data = [
    data_0,
    data_1,
    data_2,
    data_3,
    data_4,
    data_5,
    data_6,
    data_7,
    data_8,
    data_9
];

export default data;

export const stores = [
    "Safeway",
    "Albertsons",
    "7-11",
    "Metropolitan Market",
    "Trader Joe's",
    "Grocery Outlet",
    "QFC"
];

export const types = [
    "Produce",
    "Dairy",
    "Meat",
];

var foods = [];
for (var i=0; i<foodTypes.length; i++) {
    foods.push(foodTypes[i].name);
}

export const names = foods;

