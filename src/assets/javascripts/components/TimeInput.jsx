import PropTypes from 'prop-types'
import React from 'react'

export default class TimeInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
  }

  render() {
    const { id, label, onChange, value } = this.props

    return (
      <div className="TimeInput">
        <div>
          <label htmlFor={id} className={"number-input-label"}>{label}</label>
        </div>
        <input
          type="time"
          value={value}
          onChange={onChange}
          id={id}
        />
      </div>
    )
  }
}
