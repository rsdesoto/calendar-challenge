import PropTypes from 'prop-types'
import React from 'react'

export default class FilterList extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    enabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    return (
      <div className="Day">
        <div className="day-number">
          {this.props.day}
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
  }
}
