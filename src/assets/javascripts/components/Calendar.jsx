import PropTypes from 'prop-types'
import React from 'react'

import Day from './Day'
import Week from './Week'

export default class Calendar extends React.Component {
  static propTypes = {

  }

  // each calendar will be made up of Weeks
  // each Week will be made up of Day
  // each Week gets the start date of the week (the Sunday)

  render() {

    return (
      <div className="Calendar">
        <div className="week-header">
        </div>
        <Week
          startDay={-3}
        />

      </div>
    )
  }
}
