import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

class Home extends Component {
  render () {
    const authenticated = () => (
      <Redirect to={{ pathname: '/calendar' }}/>
    )

    const unauthenticated = () => (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Jumbotron variant="dark" className="jumbotron">
              <h1>Hello, and welcome to Defeat Repeat!</h1>
              <p>
                  This is a simple app, designed to keep your fashion fresh, no matter the number of shirts you own. Can&apos;t remember what you wore the last time you saw Sarah? Chris? Just make a post with your outfit and their names as tags on a specific date and you&apos;ll defeat outfit repeat!
              </p>
              <Button variant="dark" href="#/sign-up">Get Started</Button>
            </Jumbotron>
          </div>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        { this.props.user ? authenticated() : unauthenticated() }
      </Fragment>
    )
  }
}

export default withRouter(Home)
