import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

class PostCalendar extends Component {
  state = {
    date: null,
    clicked: false
  }

  onClickDay = date => {
    this.setState({ date: date, clicked: true })
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
          onClickDay={this.onClickDay}
          value={this.state.date}
        />
      </div>
    )
  }
}

export default withRouter(PostCalendar)
