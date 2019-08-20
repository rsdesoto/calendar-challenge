import PropTypes from 'prop-types'
import React from 'react'

import Button from './Button'
import TextInput from './TextInput'

export default class SchedulingForm extends React.Component {
  static propTypes = {
    appointment: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    updateValue: PropTypes.func,
    value: PropTypes.string,
    date: PropTypes.number,
    month: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      editing: !this.props.appointment.description
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({
        editing: !this.props.appointment.description
      })
    }
  }

  render() {
    const { date, appointment } = this.props
    const { editing } = this.state

    console.log(date)
    console.log(this.props.appointment)

    if (appointment.description) {
      console.log("Appointment exists")
    }

    return (
      <div className="SchedulingForm">
        { (appointment.description) ? this._renderExistingAppointmentWarning() : null }
        { editing ? this._renderAppointmentInput() : null }
      </div>
    )
  }

  _renderExistingAppointmentWarning = () => {
    const { onCancel, onDelete, month, date } = this.props

    return (
      <div className="existing-appointment-warning">
      <div>
        An appointment has already been scheduled for {month} {date.toString()}!
        </div>
        <div>Would you like to edit it?</div>
        <Button
          onClick={this._editAppointment}
          disabled={this.state.editing}
        >
          Edit
        </Button>
        <Button onClick={onDelete}> Delete </Button>
        <Button onClick={onCancel}> Cancel </Button>
      </div>
    )
  }

  _renderAppointmentInput = () => {

    const { onCancel, onSave, value, date, month } = this.props

    return (
      <div>
        <TextInput
          disabled={false}
          label={`Schedule An Appointment for ${month} ${date.toString()}:`}
          placeholder={"Enter an appointment"}
          value={value}
          onChange={this._onChange}
          id={"12345"}
        />
        <Button onClick={onSave}> Save </Button>
        <Button onClick={onCancel}> Cancel </Button>
      </div>
    )
  }

  _editAppointment = () => {
    this.setState({
      editing: true
    })
  }

  _onChange = (event) => {
    this.props.updateValue(event.target.value)
  }
}
