import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { withRouter } from 'react-router-dom'

class PostCalendar extends Component {
  state = {
    date: new Date(),
    posts: []
  }

  onClickDay = date => {
    this.setState({ date })
    this.props.history.push('/posts/')
  }

  render () {
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
