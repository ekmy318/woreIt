import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

class Posts extends Component {
  constructor () {
    super()
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
    const postsJsx = this.state.posts.filter(post => post.owner.token === this.props.user.token).map(post => (
      <ListGroup.Item key={post._id}>
        <img src={post.file}/>
        <Link to={`/posts/${post._id}`}>{post.date}</Link>
        <p>Notes: {post.notes}</p>
      </ListGroup.Item>
    ))

    if (this.state.isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      )
    }

    return (
      <ListGroup>
        {this.state.posts.length ? postsJsx : <ListGroup.Item>No posts found</ListGroup.Item>}
      </ListGroup>
    )
  }
}

export default Posts
