import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

import Day from './Day'

export default class Week extends React.Component {
  static propTypes = {
    startDay: PropTypes.number,
    onClickDay: PropTypes.func
  }

  // for each week - get the start date of that sunday
  // if the number is negative, create a DISABLED day field
  // if the number is positive, create a Day with that number

  render() {
    const { startDay } = this.props
    // for testing - August 2019
    // Sunday is the July 28th - -3

    const weekDays = _.range(startDay, startDay+7)

    return (
      <div className="Week">
        {_.map(weekDays, this._renderDay)}
      </div>
    )
  }

  _renderDay = (weekDay) => {
    let enabled = true

    if (weekDay < 1) {
      enabled = false
    }

    return (
      <Day
        day={weekDay}
        key={weekDay}
        enabled={enabled}
        onClick={this.props.onClickDay}
      />
    )
  }
}
