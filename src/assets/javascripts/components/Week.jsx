import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

import Day from './Day'

export default class Week extends React.Component {
  static propTypes = {
    startDay: PropTypes.number,
    onClickDay: PropTypes.func,
    appointments: PropTypes.object,
    daysInMonth: PropTypes.number,
    dayOfMonth: PropTypes.number,
    month: PropTypes.string
  }

  // for each week - get the start date of that Sunday
  // if the number is negative, create a invalid day field
  // if the number is positive, create a Day with that number

  render() {
    const { startDay } = this.props

    const weekDays = _.range(startDay, startDay+7)

    return (
      <div className="Week">
        {_.map(weekDays, this._renderDay)}
      </div>
    )
  }

  _renderDay = (weekDay) => {
    const { onClickDay, appointments, daysInMonth, dayOfMonth, month } = this.props

    // valid refers to valid dates. enabled refers to dates that are today or later
    let valid = true
    let enabled = true

    if (weekDay < 1 || weekDay > daysInMonth) {
      valid = false
    }

    if (weekDay < dayOfMonth) {
      enabled = false
    }

    return (
      <Day
        day={weekDay}
        key={weekDay}
        valid={valid}
        onClick={onClickDay}
        appointments={appointments}
        enabled={enabled}
        month={month}
      />
    )
  }
}
