import React, {useState, useCallback, memo} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
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

const convert = (ele, id) => {
	
}

export default (props) => {
	const today = new Date();
	const convertedData = (props.appointments.layer.length > 0 && props.appointments.layer[0].event)?(props.appointments.layer[0].event.map((element, index) => 
		convert(element, index)
	)):undefined;
	
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

	const CommandButton = useCallback(({ id, ...restProps }) => {
		if (id === 'deleteButton') {
			return <AppointmentTooltip.CommandButton id={id} {...restProps} disabled={false} />;
		}
		return <AppointmentTooltip.CommandButton id={id} {...restProps} />;
  	});

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
			<Appointments />
			<AppointmentTooltip
				headerComponent={Header}
				//showOpenButton
				showDeleteButton
				//commendButtonComponent={CommandButton}
			/>
			{/* <AppointmentForm
				commandButtonComponent={CommandButton}
			/> */}
		</Scheduler>
		</Paper>
	</React.Fragment>
	);
};
