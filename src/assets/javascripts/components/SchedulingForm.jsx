import PropTypes from 'prop-types'
import React from 'react'

import TextInput from './TextInput'
import Button from './Button'

export default class SchedulingForm extends React.Component {
  static propTypes = {
    appointment: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  render() {
    const {onCancel} = this.props
    return (
      <div className="SchedulingForm">
        <TextInput
          disabled={false}
          label={"Schedule An Appointment:"}
          placeholder={"Enter an appointment"}
          value={""}
          onChange={() => {console.log("onchange clicked")}}
          id={"12345"}
        />
        <Button disabled={true}> Save </Button>
        <Button onClick={onCancel}> Cancel </Button>
      </div>
    )
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