import PropTypes from 'prop-types'
import React from 'react'

import Day from './Day'

export default class FilterList extends React.Component {
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



    return (
      <div className="Week">
        <Day
          day={3}
        />
      </div>
    )
  }
}
