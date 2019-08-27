import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import Moment from 'react-moment'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

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
    const postsJsx = this.state.posts.filter(post =>
      (post.owner.token === this.props.user.token) && (this.props.location.state.date.substring(0, 10) === post.date.substring(0, 10))).map(post => (
      <ListGroup.Item key={post._id}>
        <img src={post.file}/>
        <Link to={`/posts/${post._id}`}><Moment add={{ days: 1 }} format="ddd, MMMM DD, YYYY" date={post.date} /></Link>
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

export default withRouter(Posts)
