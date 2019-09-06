import React, { Component } from 'react'
import ReactCalendar from 'react-calendar'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import './Calendar.css'

class Calendar extends Component {
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
        <Button variant="dark" className="outfitButton" size='lg' href='#create-post'>Log an Outfit</Button>
        <ReactCalendar
          className="calendar"
          onClickDay={this.onClickDay}
          value={this.state.date}
          locale= 'en-US'
        />
      </div>
    )
  }
}

export default withRouter(Calendar)
