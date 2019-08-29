import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

import './PostCalendar.css'

class PostCalendar extends Component {
  state = {
    date: null,
    clicked: false
  }

  onClickDay = date => {
    this.setState({ date: date.toISOString(), clicked: true })
  }

  render () {
    if (this.state.clicked) {
      return <Redirect to={{
        pathname: '/posts',
        state: { date: this.state.date }
      }} />
    }
    return (
      <div>
        <Calendar
          className="calendar"
          onClickDay={this.onClickDay}
          value={this.state.date}
          locale= 'en-US'
        />
      </div>
    )
  }
}

export default withRouter(PostCalendar)
