import { Descriptions } from "antd";
import {
    SwapRightOutlined
} from "@ant-design/icons";

const time = (arr) => {
    const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const Weekday = arr[0];
    const Date = arr[3] + "/" + String(Month.findIndex(ele => ele === arr[1]) + 1) + "/" + arr[3];
    const Time = arr[4];
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
                alignItems: "center",
                marginBottom: "0px",
                height: "32px",
                width: "204px"
            }}
        >
            <p
                style={{
                    marginBottom: "0px"
                }}
            >Weekday:{Weekday}</p>
            <p
                style={{
                    marginBottom: "0px"
                }}
            >Date:{Date}</p>
            <p
                style={{
                    marginBottom: "0px"
                }}
            >Time:{Time}</p>
        </div>
    );
}

const timeItem = (timeInterval) => {
    const startTime = String(timeInterval.startTime._d).split(" "); 
    const endTime = String(timeInterval.endTime._d).split(" ");
    
    return (
        <div
            style={{
                width: "438px",
                height: "32px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            {time(startTime)}
            <SwapRightOutlined />
            {time(endTime)}
        </div>
    );
}

export default (timeArr) => {
    return (
        <div 
            style={{
                width: "438px",
                marginLeft: "17px",
                height: "64px",
                overflow: "scroll",
                marginTop: "5px"
            }}
        >
            {timeArr.map(ele => timeItem(ele))}
        </div>
    );
}