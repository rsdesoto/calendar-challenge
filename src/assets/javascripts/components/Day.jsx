import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

export default class Day extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    enabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    const { day, enabled } = this.props

    return (
      <div className={classnames("Day", {'disabled-day': !enabled})}>
        <div className="day-number">
          { enabled ? day : null }
        </div>
        <div className="day-info"
          onClick={this._temptest}
        >
        </div>
      </div>
    )
  }

  _temptest = () => {
    console.log("clicked me")
    this.props.onClick()
  }
}
