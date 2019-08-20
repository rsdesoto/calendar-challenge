import PropTypes from 'prop-types'
import React from 'react'

export default class TextInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
  }

  render() {
    const { id, label, placeholder, onChange, value } = this.props

    return (
      <div className="TextInput">
        <div>
          <label htmlFor={id} className={"text-input-label"}>{label}</label>
        </div>
        <input
          placeholder={placeholder}
          type="text"
          onChange={onChange}
          value={value}
          id={id}
        />
      </div>
    )
  }
}
