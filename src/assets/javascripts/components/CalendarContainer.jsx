import React from 'react'
import moment from 'moment'
import _ from 'lodash'

import Calendar from './Calendar'


export default class CalendarContainer extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.state = {
      monthAppointments: {}
    }
  }

  render() {

    const months = ["August 2019", "September 2019", "October 2019", "November 2019", "December 2019"]

    return (
      <div>
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
