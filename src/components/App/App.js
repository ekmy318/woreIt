import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Home from '../Home/Home'
import PostCalendar from '../PostCalendar/PostCalendar'

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
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
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

          <Route exact path="/" component={Home}/>

          <AuthenticatedRoute
            user={user}
            exact path='/postsAll'
            render={() => (
              <PostsAll
                user={user}
                alert={this.alert} />
            )} />

          <AuthenticatedRoute
            user={user}
            exact path='/calendar'
            render={() => (
              <div>
                <PostCalendar
                  user={user}
                  alert={this.alert} />
                <PostsAll
                  user={user}
                  alert={this.alert} />
              </div>
            )} />

          <AuthenticatedRoute
            user={user}
            exact path='/posts'
            render={() => (
              <Posts
                user={user}
                alert={this.alert} />
            )} />

          <AuthenticatedRoute
            user={user}
            path='/create-post'
            render={() => (
              <PostCreate
                user={user}
                alert={this.alert} />
            )} />

          <AuthenticatedRoute
            user={user}
            exact path='/posts/:id'
            render={() => (
              <Post
                user={user}
                alert={this.alert} />
            )} />

          <AuthenticatedRoute
            user={user}
            exact path='/posts/:id/edit'
            render={() => (
              <PostUpdate
                user={user}
                alert={this.alert} />
            )} />
        </main>
        {/* <Footer /> */}
      </Fragment>
    )
  }
}

export default App
