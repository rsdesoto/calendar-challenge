import PropTypes from 'prop-types'
import React from 'react'

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
  }

  render() {
    const { children, disabled, onClick } = this.props

    return (
      <button className="Button"
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
