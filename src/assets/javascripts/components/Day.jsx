import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    enabled: PropTypes.bool,
    onClick: PropTypes.func,
    appointments: PropTypes.object
  }

  render() {
    const { day, enabled } = this.props

    return (
      <div className={classnames("Day", {'disabled-day': !enabled})}>
        <div className="day-number">
          { enabled ? day : null }
        </div>
        <div className="day-info"
          onClick={() => {this.props.onClick("august",day)}}
        >
          {this._renderAppointment()}
        </div>
      </div>
    )
  }

  _renderAppointment = () => {
    const { day, appointments } = this.props


    if (!_.has(appointments, day)) {
      return null
    } else {
      return (
        <div>
          <div className="appointment-description">{appointments[day].description}</div>
          <div className="appointment-time">{`Start: ${appointments[day].start}`}</div>
          <div className="appointment-time">{`End: ${appointments[day].end}`}</div>
        </div>
      )
    }
  }
}
