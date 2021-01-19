import React, {useState, useCallback} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import UserDataToDate from "./UserDataToDate";
import ConvertCrossDays from "./ConvertCrossDays";
import HandleAppointmentRepeat from "./HandleAppointmentRepeat";

import {
	Scheduler,
	WeekView,
	Appointments,
	AppointmentForm,
	AppointmentTooltip,
	TodayButton,
	Toolbar,
	DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';

export default (props) => {
	const today = new Date();
	const convertedData = HandleAppointmentRepeat(ConvertCrossDays(UserDataToDate(props.appointments)));
	console.log(convertedData);
	const [data, setData] = useState(convertedData);
	const [currentDate, setCurrentDate] = useState(today);

	const onCommitChanges = useCallback(({ deleted }) => {
    if (deleted !== undefined) {
    	setData(data.filter(appointment => appointment.id !== deleted));
    }
  	}, [setData, data]);
 
	const handleClickMore = (appointmentData) => {
		console.log(appointmentData)
	}

	const Header = (({children, appointmentData, classes, ...restProps}) => (
		<AppointmentTooltip.Header
			{...restProps}
			appointmentData={appointmentData}
		>
			<IconButton onClick={handleClickMore(appointmentData)}>
				<MoreIcon/>
			</IconButton>
		</AppointmentTooltip.Header>
		)
	);
	const Appointment = ({
		children, style, ...restProps
	  }) => (
		<Appointments.Appointment
		  {...restProps}
		  style={{
			...style,
			backgroundColor: restProps.data.color,
			borderRadius: '8px',
			opacity: restProps.data.isSelected ? 1.0 : 0.0,
		  }}
		>
		  {console.log(restProps)}
		  {children}
		</Appointments.Appointment>
	  );

	const handleCurrentDateChange = (newDate) => {
		setCurrentDate(newDate)
  	}

	return (
	<React.Fragment>
		<Paper>
		<Scheduler
			data={data}
			height={600} 
		>
			<ViewState
				currentDate={currentDate}
				onCurrentDateChange={handleCurrentDateChange}
			/>
			<EditingState
				onCommitChanges={onCommitChanges}
			/>

			<IntegratedEditing />
			<WeekView
				startDayHour={0}
				endDayHour={24}
				cellDuration={120}
			/>
			<Toolbar />
			<DateNavigator />
			<TodayButton />
			<Appointments appointmentComponent={Appointment}/>
			<AppointmentTooltip
				headerComponent={Header}
			/>
		</Scheduler>
		</Paper>
	</React.Fragment>
	);
};
