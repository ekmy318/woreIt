import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default MyCalendar
