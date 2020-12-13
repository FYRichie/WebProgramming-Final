import React from "react";

export default (buttonStates,weekday,month,day) => {
    if (month === 0) month = 12;
    console.log(String(month) + '/' + String(day) + ' ' + String(weekday));
};