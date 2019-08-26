import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import MonthHeader from './MonthHeader'
import SchedulingForm from './SchedulingForm'
import Week from './Week'
import WeekHeader from './WeekHeader'

export default class Calendar extends React.Component {
  static propTypes = {
    now: PropTypes.object,
    renderMonth: PropTypes.object
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
    const { appointmentEditorCollapsed, daysInMonth } = this.state
    const { renderMonth } = this.props

    // first day of the month's weekday is used to offset valid days on rendered calendar
    const calendarStartOffset = renderMonth.startOf('month').day()

    // Sunday dates used to render calendar correctly
    const weekStarts = this._getWeekStarts(1 - calendarStartOffset, daysInMonth)

    return (
      <div className="Calendar">
        <MonthHeader month={renderMonth.format("MMMM YYYY")} />
        <WeekHeader />
        {_.map(weekStarts, this._renderWeek)}
        { appointmentEditorCollapsed ? null : this._renderAppointmentEditor() }
      </div>
    )
  }

  _renderWeek = (startDay) => {
    const { appointments, daysInMonth, dayOfMonth, month } = this.state

    return (
      <Week
        startDay={startDay}
        key={startDay}
        onClickDay={this._onClickDay}
        appointments={appointments}
        daysInMonth={daysInMonth}
        dayOfMonth={dayOfMonth}
        month={month}
      />
    )
  }

  _renderAppointmentEditor = () => {
    const { appointments, date, time, description } = this.state
    const { renderMonth } = this.props

    let existingAppointment = {}

    if (appointments[date]) {
      existingAppointment = appointments[date]
    }

    return (
      <SchedulingForm
        onCancel={() => {this.setState({appointmentEditorCollapsed: true})}}
        onSave={this._onSaveAppointment}
        onDelete={this._onDeleteAppointment}
        updateValue={(appointmentText) => {this.setState({description: appointmentText})}}
        updateTimeValue={(appointmentTime) => {this.setState({time: appointmentTime})}}
        value={description}
        time={time}
        date={date}
        month={renderMonth.format("MMMM YYYY")}
        appointment={existingAppointment}
      />
    )
  }

  //////////////////////////////////////////////////////////////////////////

  _onSaveAppointment = () => {
    const { appointments, month, date, description, time, trueNow } = this.state

    console.log(trueNow)
    // moment('2010-10-20').isBefore('2010-12-31', 'year'); // false

    console.log(trueNow.format("HH:hh"))

    // if date is the same as today's date:
    // get time from trueNow
    // compare with moment(planned time).isBefore(current time, 'minute')

    const trueMonth = trueNow.format("M")

    const dayOfMonth = trueNow.date()

    if (dayOfMonth === date && trueMonth === month) {
      console.log("Same day")
      if (time < trueNow.format("HH:hh")) {
        console.log("bad time")
      }
    }

    console.log(time)



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

  _getWeekStarts = (start, end) => {
    const weekStarts = []

    let i = start

    while (i <= end) {
      weekStarts.push(i)
      i += 7
    }
    return weekStarts
  }

  _clearSelectedAppointment = () => {
    const currMonthDate = this.props.renderMonth

    const month = currMonthDate.format("M")

    // dayOfMonth is used to set which days are valid or invalid. For future months, set to 0 so all days are valid
    let dayOfMonth = 0

    if (moment().format("M") === month) {
      dayOfMonth = moment().date()
    }

    const daysInMonth = currMonthDate.daysInMonth()

    return {
      appointmentEditorCollapsed: true,
      date: 0,
      description: "",
      time: "12:00",
      daysInMonth: daysInMonth,
      month: month,
      dayOfMonth: dayOfMonth,
      trueNow: moment()
    }
  }
}
