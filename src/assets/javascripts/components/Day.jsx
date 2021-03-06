import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    valid: PropTypes.bool,
    enabled: PropTypes.bool,
    onClick: PropTypes.func,
    appointments: PropTypes.object,
    month: PropTypes.string
  }

  render() {
    const { day, valid, enabled } = this.props

    return (
      <div className={classnames("Day", {'invalid-day': !valid, 'disabled-day': !enabled})}>
        <div className="day-number">
          { valid ? day : null }
        </div>
        <button className="day-info"
          onClick={() => {this._onClickDay(day)}}
        >
          {this._renderAppointment()}
        </button>
      </div>
    )
  }

  _onClickDay = (day) => {
    const { valid, enabled, onClick, month } = this.props

    if (valid && enabled) {
      onClick(month, day)
    } else if (valid) {
      alert("This day is in the past. Please choose a different date.")
    }
  }

  _renderAppointment = () => {
    const { day, appointments } = this.props

    if (!_.has(appointments, day)) {
      return null
    } else {
      return (
        <div className="appointment-description-container">
          <div className="appointment-description">{appointments[day].description}</div>
          <div className="appointment-time">{`Time: ${appointments[day].time}`}</div>
        </div>
      )
    }
  }
}
