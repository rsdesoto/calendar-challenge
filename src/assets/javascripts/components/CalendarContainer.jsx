import React from 'react'
import moment from 'moment'
import _ from 'lodash'

import Calendar from './Calendar'

export default class CalendarContainer extends React.Component {
  render() {
    /*
      note: this calendar was built August 2019. The rest of 2019 was included for reference
      to show this can be built out as needed.
    */
    const months = ["August 2019", "September 2019", "October 2019", "November 2019", "December 2019"]

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
        month={month}
      />
    )
  }
}
