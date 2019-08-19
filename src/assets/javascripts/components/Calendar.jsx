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

  // calendar state:
  // appointments is an empty object
  // on componentDidDmount, check localstorage for appointments
  // update appointments in state accordingly

  constructor(props) {
    super(props)

    const initialState = {
      appointments: {}
    }

    this.state = _.merge(initialState, this._clearSelectedAppointment())
  }

  //////////////////////////////////////////////////////////////////////////

  render() {
    const { appointments, appointmentEditorCollapsed } = this.state

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
    return (
      <Week
        startDay={startDay}
        key={startDay}
        onClickDay={this._onClickDay}
      />
    )
  }

  _renderAppointmentEditor = () => {
    return (
      <SchedulingForm
        onCancel={this._hideAppointmentForm}
        onSave={this._onSaveAppointment}
        updateValue={(appointmentText) => {this.setState({description: appointmentText})}}
        value={this.state.description}
      />
    )
  }

  //////////////////////////////////////////////////////////////////////////

  /*
    When an appointment is saved, update state with the appointment
    to display it on the calendar
  */
  _onSaveAppointment = () => {
    const { appointments, date, description, start, end } = this.state

    const appointmentDetails = {
      description: description,
      start: start,
      end: end
    }

    appointments[date] = appointmentDetails

    this.setState(_.merge({appointments}, this._clearSelectedAppointment()))
  }

  /*
    When a day is clicked, update state with the day's date in preparation
    for creating/editing an appointment
  */
  _onClickDay = (month, date) => {
    // note: temp placeholders
    const start = "10AM"
    const end = "11AM"

    this.setState({
      appointmentEditorCollapsed: false,
      date: date,
      start: start,
      end: end
    })
  }

  /*
    Unhides the appointment field for creating or editing an appointment
  */
  _hideAppointmentForm = () => {
    this.setState({appointmentEditorCollapsed: true})
  }

  /*
    Updates the value associated with the Appointment Description input field
  */
  _updateAppointmentDescription = (event) => {
    this.setState({description: event.target.value})
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
    return {
      appointmentEditorCollapsed: true,
      date: 0,
      description: "",
      start: "",
      end: ""
    }
  }
}
