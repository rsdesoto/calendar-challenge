import PropTypes from 'prop-types'
import React from 'react'

export default class Day extends React.Component {
  static propTypes = {
    month: PropTypes.string
  }

  render() {
    return (
      <div className="MonthHeader">
        {this.props.month}
      </div>
    )
  }
}
