import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Layout from '../Layout/Layout'
import Button from 'react-bootstrap/Button'

class Posts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      isLoading: true
    }
  }

  async componentDidMount () {
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiUrl}/posts`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ posts: res.data.posts, isLoading: false })
    } catch (error) {
      this.props.alert({
        heading: 'Error',
        message: 'Something went wrong..',
        variant: 'danger'
      })
    }
  }
  render () {
    const { user, location } = this.props
    const { posts } = this.state
    const postsArray = posts.filter(post => (post.owner.token === user.token) && (location.state.date.substring(0, 10) === post.date.substring(0, 10)))
    let postsJsx = ' '

    if (posts.isLoading) {
      postsJsx = (
        <div className="text-center">
          <Button className="mt-2 mr-5" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
          <Spinner animation="border" variant="warning" />
        </div>
      )
    } else if (postsArray.length !== 0) {
      postsJsx = (
        postsArray.map(post => (
          <ListGroup.Item key={post._id}>
            <img src={post.file}/>
            <br />
            <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <p>Notes: {post.notes}</p>
          </ListGroup.Item>
        ))
      )
    } else if (postsArray.length === 0 && !posts.isLoading) {
      postsJsx = (
        <div>
          <h3>No outfit logged for this day.</h3>
          <Button className="mt-2 mr-5" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
        </div>
      )
    }
    return (
      <Layout md='8' lg='6'>
        <Button className="mb-3 ml-1" onClick={() => this.props.history.push('/calendar')}>Back to Calendar</Button>
        {postsJsx}
      </Layout>
    )
  }
}

export default withRouter(Posts)
