import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import Week from './Week'
import WeekHeader from './WeekHeader'
import MonthHeader from './MonthHeader'

export default class Calendar extends React.Component {
  static propTypes = {

  }

  // each calendar will be made up of Weeks
  // each Week will be made up of Day
  // each Week gets the start date of the week (the Sunday)


  render() {

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
      </div>
    )
  }

  _renderWeek = (startDay) => {
    return (
      <Week
        startDay={startDay}
        key={startDay}
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
}
