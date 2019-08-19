import PropTypes from 'prop-types'
import React from 'react'

import Button from './Button'
import TextInput from './TextInput'

export default class SchedulingForm extends React.Component {
  static propTypes = {
    appointment: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    updateValue: PropTypes.func,
    value: PropTypes.string,
  }

  // <Button disabled={true}> Save </Button>

  render() {
    const { onCancel, onSave, value } = this.props
    return (
      <div className="SchedulingForm">
        <TextInput
          disabled={false}
          label={"Schedule An Appointment:"}
          placeholder={"Enter an appointment"}
          value={value}
          onChange={this._onChange}
          id={"12345"}
        />
        <Button onClick={() => {onSave(3, "hello", "3AM", "10AM")}}> Save </Button>
        <Button onClick={onCancel}> Cancel </Button>
      </div>
    )
  }

  _onChange = (event) => {
    this.props.updateValue(event.target.value)
  }
}

//
// {
//   august: {
//     1: {
//       start: 2pm,
//       end: 4pm,
//       description: "dentist"
//     },
//     3: {
//       start: 1pm,
//       end: 6pm,
//       description: "dinner"
//     }
//   }
// }