import PropTypes from 'prop-types'
import React from 'react'

import Day from './Day'

export default class FilterList extends React.Component {
  static propTypes = {

  }

  render() {
    
    return (
      <div className="Calendar">
        <div className="week-header">
        </div>
        <Day
          day={3}
        />
      </div>
    )
  }
}
