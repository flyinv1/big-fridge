import React from 'react';

//Assuming ISO date format
export function cleanUpDate(dateString) {
    return dateString.slice(0, 10) + " " + dateString.slice(11, 19);
}

export function convertToCleanString(Time) {
    return Date(Time).toString().slice(0, 15);
}

