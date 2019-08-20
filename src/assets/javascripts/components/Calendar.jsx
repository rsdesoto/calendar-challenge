import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import MonthHeader from './MonthHeader'
import SchedulingForm from './SchedulingForm'
import Week from './Week'
import WeekHeader from './WeekHeader'

export default class Calendar extends React.Component {
  static propTypes = {

  }


  constructor(props) {
    super(props)

    const initialState = {
      appointments: {}
    }

    this.state = _.merge(initialState, this._clearSelectedAppointment())
  }

  //////////////////////////////////////////////////////////////////////////

  render() {
    const { appointmentEditorCollapsed } = this.state

    // date and time manipulation to create the calendar
    const now = moment()

    // get the day of the week of the first day of the month
    const calendarStartOffset = now.startOf('month').day()

    // get the total number of days for this month
    const monthEnd = now.daysInMonth()

    // get the array of Sunday dates
    const weekStarts = this._getWeekStarts(1 - calendarStartOffset, monthEnd)

    return (
      <div className="Calendar">
        <MonthHeader
          month={now.format("MMMM")}
        />
        <WeekHeader />
        {_.map(weekStarts, this._renderWeek)}
        { appointmentEditorCollapsed ? null : this._renderAppointmentEditor() }
      </div>
    )
  }

  _renderWeek = (startDay) => {
    const { appointments, daysInMonth, dayOfMonth } = this.state

    return (
      <Week
        startDay={startDay}
        key={startDay}
        onClickDay={this._onClickDay}
        appointments={appointments}
        daysInMonth={daysInMonth}
        dayOfMonth={dayOfMonth}
      />
    )
  }

  _renderAppointmentEditor = () => {

    const { appointments, date } = this.state

    let existingAppointment = {}

   if (appointments[date]) {
     existingAppointment = appointments[date]
   }

    return (
      <SchedulingForm
        onCancel={this._hideAppointmentForm}
        onSave={this._onSaveAppointment}
        onDelete={this._onDeleteAppointment}
        updateValue={(appointmentText) => {this.setState({description: appointmentText})}}
        value={this.state.description}
        updateTimeValue={(appointmentTime) => {this.setState({time: appointmentTime})}}
        time={this.state.time}
        date={date}
        month={moment().format("MMMM")}
        appointment={existingAppointment}
      />
    )
  }

  //////////////////////////////////////////////////////////////////////////

  /*
    When an appointment is saved, update state with the appointment
    to display it on the calendar
  */
  _onSaveAppointment = () => {
    const { appointments, date, description, time } = this.state

    const appointmentDetails = {
      description: description,
      time: time
    }

    appointments[date] = appointmentDetails

    this.setState(_.merge({appointments}, this._clearSelectedAppointment()))
  }

  _onDeleteAppointment = () => {
    const { appointments, date } = this.state

    delete appointments[date]

    this.setState(_.merge({appointments}, this._clearSelectedAppointment()))
  }

  /*
    When a day is clicked, update state with the day's date in preparation
    for creating/editing an appointment
  */
  _onClickDay = (month, date) => {

    const { appointments } = this.state

    let description = ""
    let time = "12:00"

    if (appointments[date]) {
      description = appointments[date].description
      time = appointments[date].time
    }

    this.setState({
      appointmentEditorCollapsed: false,
      date: date,
      time: time,
      description: description
    })
  }

  /*
    Unhides the appointment field for creating or editing an appointment
  */
  _hideAppointmentForm = () => {
    this.setState({appointmentEditorCollapsed: true})
  }

  /*
    Generate the initial starting week information to render the calendar.
    Each item in the array is day number of the Week's Sunday
  */
  _getWeekStarts = (start, end) => {
    const weekStarts = []

    let i = start

    while (i <= end) {
      weekStarts.push(i)
      i += 7
    }
    return weekStarts
  }

  /*
    Clear out any appointment information from state - used in initial state
    declaration and after using save/cancel
  */
  _clearSelectedAppointment = () => {

    // date and time manipulation to create the calendar
    const now = moment()

    // get the total number of days for this month
    const monthEnd = now.daysInMonth()

    const month = now.format("M")

    const dayOfMonth = moment().date()

    return {
      appointmentEditorCollapsed: true,
      date: 0,
      description: "",
      time: "12:00",
      daysInMonth: monthEnd,
      month: month,
      dayOfMonth: dayOfMonth
    }
  }
}
