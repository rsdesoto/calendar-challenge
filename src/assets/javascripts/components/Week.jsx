import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

import Day from './Day'

export default class Week extends React.Component {
  static propTypes = {
    startDay: PropTypes.string
  }

  // for each week - get the start date of that sunday
  // if the number is negative, create a DISABLED day field
  // if the number is positive, create a Day with that number

  render() {
    const startDay = -3
    // for testing - August 2019
    // Sunday is the July 28th - -3
    const weekDays = [-3, -2, -1, 0, 1, 2, 3]

    _.map(weekDays, function(weekDay) {
      console.log(weekDay)
    })

    return (
      <div className="Week">
        {_.map(weekDays, this._renderDay)}
      </div>
    )
  }

  _renderDay = (weekDay) => {
    return (
      <Day
        day={weekDay}
        key={weekDay}
      />
    )
  }
}
