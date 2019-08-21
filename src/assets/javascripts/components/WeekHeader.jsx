import React from 'react'
import _ from 'lodash'

export default class Week extends React.Component {
  render() {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

    return (
      <div className="WeekHeader">
        {_.map(days, this._renderDayHeader)}
      </div>
    )
  }

  _renderDayHeader = (day) => {
    return(
      <div className="day-header" key={day}>
        {day}
      </div>
    )
  }
}
