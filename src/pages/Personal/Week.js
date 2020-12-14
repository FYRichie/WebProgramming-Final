import React from "react";
import Day from "./Day";

export default (buttonStates) => {
    const today = new Date();
    let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthDays = [31, 28 + (today.getFullYear() % 4 === 0) ? 1 : 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    weekDay = [...weekDay.slice(today.getDay(), 7),...weekDay.slice(0, today.getDay())];
    return (
        weekDay.map((ele,index) => (
            Day(buttonStates, ele, (today.getMonth() + 1 + Math.floor((today.getDate() + index) / monthDays[today.getMonth()])) % 12, today.getDate() + index)
        ))
    );
};