import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import Week from './Week'
import WeekHeader from './WeekHeader'
import MonthHeader from './MonthHeader'
import SchedulingForm from './SchedulingForm'

export default class Calendar extends React.Component {
  static propTypes = {

  }

  // calendar state:
  // appointments is an empty array
  // on componentDidDmount, check localstorage for appointments
  // update appointments in state accordingly
  // appointment editor collapsed - this hides/shows the appointment section

  // state - also needs the date, description, start, end times
  // of an appointment selected

  // note - switch initial state out - need to use this for resetting state after
  // an appointment has been added

  constructor(props) {
    super(props)

    const initialState = {
      appointments: {}
    }

    this.state = _.merge(initialState, this._clearState())
  }

  _clearState = () => {
    return {
      appointmentEditorCollapsed: true,
      date: 0,
      description: "",
      start: "",
      end: ""
    }
  }

  // each calendar will be made up of Weeks
  // each Week will be made up of Day
  // each Week gets the start date of the week (the Sunday)


  render() {

    const { appointments, appointmentEditorCollapsed } = this.state

    // date and time manipulation to create the calendar
    const now = moment()

    // get the day of the week of the first day of the month
    const calendarStartOffset = now.startOf('month').day()

    // get the total number of days for this month
    const monthEnd = now.daysInMonth()

    // get the starting day number to generate the calendar
    const firstWeekStartDate = 1 - calendarStartOffset

    // get the array of Sunday dates
    const weekStarts = this._getWeekStarts(firstWeekStartDate, monthEnd)

    return (
      <div className="Calendar">
        <MonthHeader
          month={"August"}
        />
        <WeekHeader />
        {_.map(weekStarts, this._renderWeek)}
        { appointmentEditorCollapsed ? null : this._renderAppointmentEditor() }

      </div>
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

  _renderWeek = (startDay) => {
    return (
      <Week
        startDay={startDay}
        key={startDay}
        onClickDay={this._onClickDay}
      />
    )
  }

  _getWeekStarts = (start, end) => {
    const weekStarts = []

    let i = start

    while (i <= end) {
      weekStarts.push(i)
      i += 7
    }
    return weekStarts
  }

  _onClickDay = (month, date) => {
    // need to: show the form, seed what day

    // note: temp placeholders
    const start = "10AM"
    const end = "11AM"

    this.setState({
      appointmentEditorCollapsed: false,
      date: date,
      start: start,
      end: end
    }, () => {
      console.log(this.state)
    })
  }

  _hideAppointmentForm = () => {
    this.setState({appointmentEditorCollapsed: true})
  }

  _updateAppointmentDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  _onSaveAppointment = () => {
    const { appointments, date, description, start, end } = this.state

    const appointmentDetails = {
      description: description,
      start: start,
      end: end
    }

    appointments[date] = appointmentDetails

    this.setState({
      appointments
    }, () => {this.setState(this._clearState())})
  }
}
