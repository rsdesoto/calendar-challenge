import PropTypes from 'prop-types'
import React from 'react'

import Button from './Button'
import TextInput from './TextInput'
import TimeInput from './TimeInput'

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
    time: PropTypes.string,
    updateTimeValue: PropTypes.func
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
    const { appointment } = this.props
    const { editing } = this.state

    return (
      <div className="SchedulingForm">
        <div className="scheduling-form-contents">
          { (appointment.description) ? this._renderExistingAppointmentWarning() : null }
          { editing ? this._renderAppointmentInput() : null }
        </div>
      </div>
    )
  }

  _renderExistingAppointmentWarning = () => {
    const { onCancel, onDelete, month, date, appointment } = this.props

    return (
      <div className="existing-appointment-warning">
        <div>
          An appointment has already been scheduled for {date.toString()} {month}!
        </div>
        <div className="existing-appointment-description">
          {appointment.description} at {appointment.time}
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

    const { onCancel, onSave, value, date, month, time } = this.props

    return (
      <div>
        <TextInput
          disabled={false}
          label={`Schedule An Appointment for ${date.toString()} ${month}:`}
          placeholder={"Enter an appointment"}
          value={value}
          onChange={this._onChange}
          id={"appointment-text-description"}
        />
        <TimeInput
          label={"Time:"}
          value={time}
          onChange={this._onTimeChange}
          id={"appointment-time"}
        />
        <Button
          onClick={onSave}
          disabled={(value.trim() === "")}
        >
          Save
        </Button>
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

  _onTimeChange = (event) => {
    this.props.updateTimeValue(event.target.value)
  }
}
