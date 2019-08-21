import React from 'react'
import moment from 'moment'
import _ from 'lodash'

import Calendar from './Calendar'

export default class CalendarContainer extends React.Component {
  render() {

    // note: this calendar will provide the current month and the next 5 months.
    const months = this._getMonths()

    return (
      <div className="CalendarContainer">
        {_.map(months, this._renderAllCalendars)}
      </div>
    )
  }

  _renderAllCalendars = (month) => {
    const now = moment()

    return (
      <Calendar
        now={now}
        renderMonth={month}
        key={month}
      />
    )
  }

  _getMonths = () => {
    const monthArr = []

    _.map([0,1,2,3,4,5], (i) => {
      monthArr.push(moment().startOf('month').add(i,'M'))
    })

    return monthArr
  }
}
