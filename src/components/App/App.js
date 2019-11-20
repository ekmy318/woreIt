import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../Authentication/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../Authentication/AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../Authentication/SignUp/SignUp'
import SignIn from '../Authentication/SignIn/SignIn'
import SignOut from '../Authentication/SignOut/SignOut'
import ChangePassword from '../Authentication/ChangePassword/ChangePassword'

import Home from '../Home/Home'
import Calendar from '../Calendar/Calendar'

import PostsAll from '../Posts/PostsAll'
import Posts from '../Posts/Posts'
import Post from '../Posts/Post'
import PostCreate from '../Posts/PostCreate'
import PostUpdate from '../Posts/PostUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert key={index} heading={alert.heading} variant={alert.variant} message={alert.message} />
        ))}
        <main className="container-fluid">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <Route exact path='/' render={() => (
            <Home user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/postsAll' render={() => (
            <PostsAll user={user} alert={this.alert} />
          )} />

          <AuthenticatedRoute user={user} exact path='/calendar' render={() => (
            <div className="row">
              <Calendar user={user} alert={this.alert} />
              <PostsAll user={user} alert={this.alert} />
            </div>
          )} />

          <AuthenticatedRoute user={user} exact path='/posts' render={() => (
            <Posts user={user} alert={this.alert} />
          )} />

          <AuthenticatedRoute user={user} path='/create-post' render={() => (
            <PostCreate user={user} alert={this.alert} />
          )} />

          <AuthenticatedRoute user={user} exact path='/posts/:id' render={() => (
            <Post user={user} alert={this.alert} />
          )} />

          <AuthenticatedRoute user={user} exact path='/posts/:id/edit' render={() => (
            <PostUpdate user={user} alert={this.alert} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
