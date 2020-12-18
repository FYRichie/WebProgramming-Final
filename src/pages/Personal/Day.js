import React from "react";
import Timeline from "react-calendar-timeline/lib";
import moment from "moment";

/*const group = [
    {
        id: 1,
        title: "group 1",
    }
];

const items = [{
    id: 1,
    group: 1,
    title: 'Random title',
    start_time: 1457902922261,
    end_time: 1457902922261 + 86400000,
    canMove: true,
    canResize: false,
    canChangeGroup: false,
    className: 'weekend',
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') }
    }
  }];*/

export default (buttonStates,weekday,month,day) => {
    if (month === 0) month = 12;
    console.log(String(month) + '/' + String(day) + ' ' + weekday);
    return (
        <div style={{height: window.screen.height - 55, width: window.screen.width - 40}} className="day">
            <div className="day-detail">
                {weekday} <br/>
                {String(month) + '/' + String(day)}
            </div>
            <div>
                {/*<Timeline 
                    groups={group}
                    items={items}
                    defaultTimeStart={moment().add(-12, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                />*/}
            </div>
        </div>
    );
};