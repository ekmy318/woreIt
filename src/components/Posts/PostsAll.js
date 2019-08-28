import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

class PostsAll extends Component {
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
    const { posts } = this.state
    const { user } = this.props
    const postsArray = posts.filter(post => (post.owner.token === user.token))

    if (posts.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      )
    } else if (posts.length !== 0) {
      return (
        postsArray.map(post => (
          <ListGroup.Item key={post._id}>
            <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
            <p>Notes: {post.notes}</p>
          </ListGroup.Item>
        ))
      )
    } else {
      return (
        <h3>No outfit logged for this day.</h3>
      )
    }
  }
}

export default withRouter(PostsAll)
