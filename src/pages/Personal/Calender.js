import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const Calender = (props) => {
    const [appointments, setAppointments] = useState(props.events)
    const [currentDate, setCurrentDate] = useState(new Date())

    const handleCurrentDateChange = (newDate) => { 
        console.log(newDate)
        setCurrentDate(newDate)
    };

    return (
      <Paper>
        <Scheduler
          data={appointments}
          height={700}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={handleCurrentDateChange}
          />
          <WeekView
            startDayHour={0}
            endDayHour={24}
            cellDuration={120}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip 
            showCloseButton
            showDeleteButton
            showOpenButton
          />
          <AppointmentForm 
            readOnly
          />
        </Scheduler>
      </Paper>
    );
  
}

export default Calender