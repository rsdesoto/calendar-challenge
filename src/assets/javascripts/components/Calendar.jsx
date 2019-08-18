import React from 'react'
import _ from 'lodash'

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

    const weekStarts = [-3, 4, 11, 18, 25]

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

  _getStartDate = () => {
    return null
  }

  _getWeekStarts = () => {
    return null
  }
}
